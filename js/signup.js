"use strict";

var occupationOtherShown = false;
var zipRegExp = new RegExp('^\\d{5}$');
var minAgeRequirement = 13;

function onReady() {
	var elem = document.getElementById("state");
	for (var i = 0; i < usStates.length; i++) {
        var opt = document.createElement("option");
        opt.value = usStates[i];
        var text = document.createTextNode(usStates[i].name);
        opt.appendChild(text);
        elem.appendChild(opt);

        if (document.getElementById("occupation").value == "other") {
        	occupationOtherShown = true;
        }

        var form = document.getElementById("signup");
        form.addEventListener('change', onChange);
        form.addEventListener('submit', onSubmit);
        
        var cancel = document.getElementById("cancelButton");
        cancel.addEventListener('click', onCancel);
    }
} //onReady()

function onChange() {
	var occ = document.getElementById("occupationOther").style;
	if (document.getElementById("occupation").value == "other") {
		occupationOtherShown = true;
		occ.display = "initial";
	}
	else {
		occupationOtherShown = false;
		occ.display = "none";
	}
} //onChange()

function onSubmit(evt) {
	var valid = validateForm(this);

	if (!valid && evt.preventDefault) {
		evt.preventDefault();
	}

	evt.returnValue = valid;
	return valid;
} //onSubmit()

function validateForm(form) {
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];

	if (occupationOtherShown == true) {
		requiredFields.push('occupationOther');
	}

	var validForm = true;

	for (var i = 0; i < requiredFields.length; i++) {
		validForm &= validateRequiredField(requiredFields[i], form);
	}

	return validForm;
} //validateForm()

function validateRequiredField(field, form) {
	// Nothing entered in required field
	if (0 == form[field].value.trim().length) {
		form[field].style.border = "1px solid #FF0000";
		return false;
	}
	// Zip field not formatted correctly
	else if (field == 'zip' && !zipRegExp.test(form[field].value)) {
		form[field].style.border = "1px solid #FF0000";
		return false;
	}
	// Birthdate field
	else if (field == 'birthdate') {
		var birth = new Date(form[field].value);
		var minimum = new Date();
		minimum.setFullYear(minimum.getFullYear() - minAgeRequirement);

		// User is not 13 years old
		if (minimum.getTime() < birth.getTime()) {
			form[field].style.border = "1px solid #FF0000";
			document.getElementById('birthdateMessage').innerHTML = "You must be at least 13 years or older";
			return false;
		}
	}
	
	return true;
} //validateRequiredField()

function onCancel() {
	if (window.confirm("Are you sure?")) {
		window.location.replace("http://google.com");
	}
} //onCancel()

document.addEventListener('DOMContentLoaded', onReady);
