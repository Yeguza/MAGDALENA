let idNumber = 1;

const regions = ['Mwanza', 'Dar es Salaam'];

const categories = ["Cellphones & Smartphones", 'Laptop & Notebooks', "Desktop & Components", "Camera & Drones", 
                    "Networking & Services", "Printers & Scanners", "Routers & Modems", "TV & Componets", "Portable Audio"
      ];


function dropDownContainer(targetElem, placeholderText) {
	let elem = $('<div></div>',{
		class: "dropdown-container " + "class" + idNumber,
		id: "dropdown" + idNumber,
		onclick: "toggleDropDown(id)"
	});

	let placeholderElem = $("<span></span>", {
		class: "placeholder"
	});

	placeholderElem.text(placeholderText);

	let dropDownIcon = $("<span></span>",  {
		class: "dropdown-icon"
	});

	dropDownIcon.html(
		`<svg width="14px" height="7px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Delivery" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Transactions-(Landing)" transform="translate(-1360.000000, -29.000000)" fill="#CDCFD3" fill-rule="nonzero">
                    <g id="Group-4" transform="translate(1360.000000, 29.000000)">
                    <polygon id="Shape" points="0 0 5 5 10 0"></polygon>
                   </g>
                </g>
            </g>
        </svg>`
	);

	elem.append([placeholderElem, dropDownIcon]);
	elem.insertAfter(targetElem);
	idNumber += 1;
}


function dropdownOptions(options, parentElem) {
	let optionsContainer = $('<div></div>', {
		class: 'options'
	});

	let optionElems = options.map(function(option) {
		return $('<p></p>', {
			class: "option"
		}).text(option);
	});

	optionsContainer.append(optionElems);
	$(parentElem).append(optionsContainer);
}


function toggleDropDown(id) {
	let elem = $("#" + id + " .options");
	if (elem.hasClass('show')) {
		elem.removeClass('show');
		document.body.style.overflowY = "scroll";
		
	} else {
		elem.addClass('show');
		document.body.style.overflowY = "hidden";
	}
}


let regionsParent = $("#region-container>label");
let categoriesParent = $('#category-container>label');

dropDownContainer(categoriesParent, 'Choose category');
dropDownContainer(regionsParent, 'Choose regions');
dropdownOptions(regions, '#dropdown2');
dropdownOptions(categories, "#dropdown1");
