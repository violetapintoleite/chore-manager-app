const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
      		isLoggedIn: false,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction

			createNewUser: async (email, username, password) => {
				
				const opts = {
					method: "POST",
					headers: { "Content-Type": "application/json"},
          			body: JSON.stringify({
						email: email,
						username: username,
						password: password,
          			}),
				};

				try {
					const resp = await fetch(
					  "https://3001-violetapint-choremanage-wth2flooiwp.ws-eu53.gitpod.io/api/signup",
					  opts
					);
					
				   
					if (resp.status !== 201) {
					  alert("error before initial 201 request");
					  return false;
					}
					const data = await resp.json();
					console.log("this came from the backend", data);
					// need to set up local storage function
					localStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true;
				  } 
				  	catch (error) {
					console.log("there's an error creating the account");
				  }
			},
			//setting the token to the localstorage 
			setToken: () => {

				const token = localStorage.getItem("token") || null;
				setStore(token);
			},

			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// getMessage: async () => {
			// 	try{
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
