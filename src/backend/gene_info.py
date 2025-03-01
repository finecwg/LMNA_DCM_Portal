from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser

import os
import pprint
import sys
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())
GROQ_API_KEY = os.environ["GROQ_API_KEY"]


llm_api = ChatGroq(
    model_name="llama-3.3-70b-specdec",
    temperature=0.1
)

prompt_api = PromptTemplate(
    input_variables=["gene"],
    template="""
    Provide a concise 1-2 sentence description of the gene {gene}.
    Keep the response under 100 words and be factual.
    """
)


output_parser = StrOutputParser()

chain_api = prompt_api | llm_api | output_parser

class GeneInfoQA():
    def __init__(self):
        self.chain = chain_api
    def get_result(self, gene):
        result = self.chain.invoke({"gene": gene})
        return result
    
'''
if __name__ == "__main__":
    gene_info_qa = GeneInfoQA()
    print(gene_info_qa.get_result("MYH7"))
'''