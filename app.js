/*
plan.js:
1.joinUser
2.Deposit
3.Withdraw
4.Take loan
*/

let app = {
	currentUser: null,
	manageJoinUser: {
		showJoinUser: (id) => {
			document.getElementById(id).style.display = "block";
		},
		hideJoinUser: (id) => {
			document.getElementById(id).style.display = "none";
		}
	}
}


const joinUser = () => {
	let validation = false;
	// handle create user
	const handleCreateUser = (id,id2,balance,err,createUserDiv) => {
		let inputUserValue = document.getElementById(id).value;
		
		// get user from local storage
		let data = window.localStorage.getItem(inputUserValue);
		if(data) {
			// simply log in by hiding the create user div
			app.currentUser = inputUserValue;
			app.manageJoinUser.hideJoinUser(createUserDiv);
			// call the create dashboard div
			// return
			return;
		}
		// if user doesn't exist
		// check balance
		let balanceValue = Number(document.getElementById(balance).value);
		if(balanceValue >= 5000) {
			// store in local storage
			app.currentUser = inputUserValue;
			window.localStorage.setItem(inputUserValue, balanceValue);
			// simply log in by hiding the create user div
			app.manageJoinUser.hideJoinUser(createUserDiv);
			// call the create dashboard div
			// return
			return;
		}
		// show error.
		// showError
		document.getElementById(err).innerHTML = "User name must be only letters and deposit greater or equal to 5000 rfw for new users";
		
	}
	// handle input validation
	const handleFormControl = (id,err, id2) => {
		
		let inputValue = document.getElementById(id).value;
		if(inputValue.length<5) {
			return;
		}
		
		
		let regex = /[a-zA-Z]/g;
		if(inputValue.match(regex).length == inputValue.length) {
  			validation = true;
		}else {
  			validation = false;
			document.getElementById(err).innerHTML = "User name must be only letters and deposit greater or equal to 5000 rfw for new users";
		
		}
		if(validation == true) {
			document.getElementById(id2).removeAttribute("disabled");
		}else {
			// showError
			document.getElementById(err).innerHTML = "User name must be only letters and deposit greater or equal to 5000 rfw for new users";
			document.getElementById(id2).setAttribute("disabled","");
		}
	}
	// user interface
	// create user
	let userCredentialsDiv = document.createElement('div');
	userCredentialsDiv.setAttribute("id","userCredentialsDiv");
	userCredentialsDiv.setAttribute("class","userCredentialsDiv");
	


	// keep building user interface
	let inputUser = document.createElement("input");
	inputUser.setAttribute("id","inputUser");
	inputUser.setAttribute("type","text");
	inputUser.setAttribute("class","formControl");
	inputUser.addEventListener("keyup",() => {
		handleFormControl('inputUser','inputStatus','submitButton');
	});
	inputUser.setAttribute("placeholder","Enter your username");

	// initial deposit
	let userBalance = document.createElement("input");
	userBalance.setAttribute("id", "userBalance");
	userBalance.setAttribute("type", "number");
	userBalance.setAttribute("class","userBalance");
	userBalance.setAttribute("placeholder","New users deposit 5000 or more, existing users don't have to enter anything.");

	// label for errors
	let errorInput = document.createElement("label");
	errorInput.setAttribute("id","inputStatus");
	errorInput.setAttribute("class","inputStatus");

	// submit button
	let submitButton = document.createElement("input");
	submitButton.setAttribute("id","submitButton");
	submitButton.setAttribute("type","submit");
	submitButton.setAttribute("class","submitButton");
	submitButton.setAttribute("disabled","");

	// form with username and initial deposit > 5000 rfw
	let createUserForm = document.createElement("form");
	createUserForm.setAttribute("class","createUserForm");
	createUserForm.addEventListener("submit",e => {
		e.preventDefault();
		
		handleCreateUser('inputUser','submitButton', 'userBalance','inputStatus','userCredentialsDiv');
	});

	
	// append to form
	createUserForm.appendChild(inputUser);
	createUserForm.appendChild(userBalance);
	createUserForm.appendChild(errorInput);
	createUserForm.appendChild(submitButton);

	// append to div
	userCredentialsDiv.appendChild(createUserForm);

	// add to app
	document.getElementById("app").appendChild(userCredentialsDiv);
}

joinUser();




