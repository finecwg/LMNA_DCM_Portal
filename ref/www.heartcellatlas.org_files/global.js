document.addEventListener('DOMContentLoaded', function() {

    // Initialize scrollspy
    var elems = document.querySelectorAll('.scrollspy');
    var options = {
      activeClass: 'active'
    }
    var instances = M.ScrollSpy.init(elems, options);

    // Initialize collapsible
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);

    // Initialize tooltips
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, options);

    // Enable dropdowns
    var elems = document.querySelectorAll('.dropdown-trigger');
    var options = {
      constrainWidth: false
    }  
    var instances = M.Dropdown.init(elems, options);

    // Enable modals
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  })
