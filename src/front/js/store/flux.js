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
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      choreList: [],
      testeList: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      createNewUser: async (email, username, password) => {
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
          }),
        };

        try {
          const resp = await fetch(
            "https://3001-violetapint-choremanage-3mtfu8tjb1v.ws-eu53.gitpod.io/api/signup",
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
        } catch (error) {
          console.log("there's an error creating the account");
        }
      },
      //setting the token to the localstorage
      setToken: () => {
        const token = localStorage.getItem("token") || null;
        console.log("this is your token", token);
        setStore(token);
      },
      // functionality to log out / remove token
      logout: () => {
        localStorage.removeItem("token");
        console.log("log out triggered");
        setStore({ token: null });
      },

      // creating the login functionality - needs to verify if user exists in DB and generate access token
      login: async (email, username, password) => {
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
          }),
        };

        try {
          const resp = await fetch(
            "https://3001-violetapint-choremanage-3mtfu8tjb1v.ws-eu53.gitpod.io/api/login",
            opts
          );

          if (resp.status !== 201) {
            alert("there's an error before the 201");
            return false;
          }
          const data = await resp.json();
          console.log("this came from the backend", data);
          localStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          console.log("checking the stored token", store.token);
          return true;
        } catch (error) {
          console.log("there's an error logging in ");
        }
      },

      // checking logged in token and access to a restricted page
      loggedInMessage: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          // fetching data from the backend
          const resp = await fetch(
            "https://3001-violetapint-choremanage-3mtfu8tjb1v.ws-eu53.gitpod.io/api/profile",
            opts
          );

          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
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
      },

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
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

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
      },
      setChoreList: (chore, date, duration) => {
        const store = getStore();
        let new_chore = store.choreList;
        new_chore.push({ chore: chore, date: date, duration: duration });
        setStore({ choreList: new_chore });
        getActions().postChore(chore, date, duration);
        getActions().getChoresByUserId("1");
        
      },
      getChoresByUserId: async () => {
        const opts = { method: "GET" };

        try {
          const resp = await fetch(
            "https://3001-violetapint-choremanage-3mtfu8tjb1v.ws-eu53.gitpod.io/api/chore",
            opts
          );

          if (resp.status !== 201) {
            alert("error before initial 201 request");

            return false;
          }
          const data = await resp.json();
          console.log("this came from the backend", data);

          return true;
        } catch (error) {
          console.log("there's an error fetching the chores");
        }
      },
      postChore: async (chore, date, duration) => {
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "1",
            chore: chore,
            date: date,
            duration: duration,
          }),
        };

        try {
          const resp = await fetch(
            "https://3001-violetapint-choremanage-3mtfu8tjb1v.ws-eu53.gitpod.io/api/chore",
            opts
          );

          if (resp.status !== 201) {
            alert("error before initial 201 request");

            return false;
          }
          const data = await resp.json();
          console.log("this came from the backend", data);

          return true;
        } catch (error) {
          console.log("there's an error adding the chore to the DB");
        }
      },
    },
  };
};

export default getState;
