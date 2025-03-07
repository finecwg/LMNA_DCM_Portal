from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain.output_parsers import StructuredOutputParser, ResponseSchema
from typing import Dict

import os
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())
GROQ_API_KEY = os.environ["GROQ_API_KEY"]

llm_api = ChatGroq(
    model_name="llama-3.3-70b-specdec",
    temperature=0.1
)

response_schemas = [
    ResponseSchema(name="basic_info", 
                  description="Brief description of gene's primary function and role in cellular processes"),
    ResponseSchema(name="disease_relevance", 
                  description="Explanation of how the gene's expression or function changes in LMNA-DCM"),
    ResponseSchema(name="therapeutic_potential", 
                  description="Assessment of the gene's potential as a therapeutic target")
]

output_parser = StructuredOutputParser.from_response_schemas(response_schemas)

prompt = """Analyze the {gene} gene in the context of LMNA-DCM (Lamin A/C-related Dilated Cardiomyopathy).

Please provide your response in the following format:

basic_info: Brief description of the gene's primary function (1-2 sentences)
disease_relevance: How and why the gene's expression or function changes or not in LMNA-DCM with mechanisms. (1-2 sentences)
therapeutic_potential: Assessment of feasibility as a potential therapeutic target or not with mechanisms and therapy candidates/categories. (1-2 sentences)

As an AI, a super-dimensional life form, please consider and reason in a super-logical and super-objective way that humans cannot think of.

Be specific and concise, avoiding generalities. It should be practical and useful for the world-class scientists, not be abstract.

Note that the audience is experts in the field, and they want useful information for their research.

it should be detailed and specific but concise, with concrete composition.
Tip: Answer after asking "How", "Why", and "So What" questions to yourself to beautifully articulate the scientific and clinical aspects. 

Be factual and precise, avoiding speculation. Base your response on established scientific knowledge."""

prompt_api = PromptTemplate(
    input_variables=["gene"],
    template=prompt
)

class GeneInfoQA:
    def __init__(self):
        self.llm = llm_api
        self.prompt = prompt_api
        
    def get_result(self, gene: str) -> Dict:
        try:
            # Get raw response from LLM
            raw_response = self.llm.invoke(
                self.prompt.format(gene=gene)
            )
            
            # Extract content from the response
            if hasattr(raw_response, 'content'):
                content = raw_response.content
            else:
                content = str(raw_response)
            
            # Parse the sections
            parsed_response = {
                "basic_info": "",
                "disease_relevance": "",
                "therapeutic_potential": ""
            }
            
            current_section = None
            current_text = []
            
            for line in content.split('\n'):
                line = line.strip()
                if not line:
                    continue
                    
                if line.startswith('basic_info:'):
                    current_section = 'basic_info'
                    current_text = [line.replace('basic_info:', '').strip()]
                elif line.startswith('disease_relevance:'):
                    if current_section:
                        parsed_response[current_section] = ' '.join(current_text)
                    current_section = 'disease_relevance'
                    current_text = [line.replace('disease_relevance:', '').strip()]
                elif line.startswith('therapeutic_potential:'):
                    if current_section:
                        parsed_response[current_section] = ' '.join(current_text)
                    current_section = 'therapeutic_potential'
                    current_text = [line.replace('therapeutic_potential:', '').strip()]
                else:
                    if current_section:
                        current_text.append(line)
            
            if current_section:
                parsed_response[current_section] = ' '.join(current_text)
            
            return {
                "gene": gene,
                "description": parsed_response,
                "status": "success"
            }
                
        except Exception as e:
            print(f"Error processing response: {e}")
            return {
                "gene": gene,
                "description": {
                    "basic_info": "Error processing response",
                    "disease_relevance": "",
                    "therapeutic_potential": ""
                },
                "status": "error"
            }
    
'''
if __name__ == "__main__":
    gene_info_qa = GeneInfoQA()
    print(gene_info_qa.get_result("MYH7"))
'''