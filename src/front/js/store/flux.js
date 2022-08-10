const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      email: null,
      username: null,
      token: null,
      isLoggedIn: false,
      message: null,
      team: null,
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
      teamChoreList: [],

      testeList: [],
      quote: [],
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
            process.env.BACKEND_URL + "/api/signup",

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

          setStore({
            token: data.access_token,
            email: email,
            username: username,
            isLoggedIn: true,
          });

          return true;
        } catch (error) {
          console.log("there's an error creating the account");
          alert("email or username already exists");
        }
      },

      //setting the token to the localstorage
      setToken: () => {
        const token = localStorage.getItem("token") || null;
        console.log("this is your token", token);

        setStore({ token });
      },
      // functionality to log out / remove token
      logout: () => {
        localStorage.removeItem("token");
        console.log("log out triggered");
        setStore({ token: null, team: null });
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
            process.env.BACKEND_URL + "/api/login",

            opts
          );

          if (resp.status !== 201) {
            alert("there's an error before the 201");
            return false;
          }
          const data = await resp.json();
          console.log("this came from the backend", data);
          localStorage.setItem("token", data.access_token);

          setStore({
            token: data.access_token,
            email: email,
            isLoggedIn: true,
          });

          console.log("checking the stored token", store.token);
          return true;
        } catch (error) {
          console.log("there's an error logging in ");
        }
      },

      // checking logged in token and access to a restricted page

      checkIfAuthorized: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          // fetching data from the backend
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/profile",

            opts
          );

          const data = await resp.json();

          setStore({ message: data.message, email: data.logged_in_as });

          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      setChoreList: (chore, date, duration) => {
        const store = getStore();
        let new_chores = store.choreList;
        new_chores.push({ name: chore, date: date, duration: duration });
        setStore({ choreList: new_chores });
        getActions().postChore(chore, date, duration, store.email);
      },

      getChoresByUserEmail: async () => {
        const store = getStore();
        const opts = { method: "GET" };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/chore" + `?email=${store.email}`,
            opts
          );

          if (resp.status !== 200) {
            alert("error before initial 200 request of GET request");

            return false;
          }
          const data = await resp.json();
          console.log("here are the user chores", data.chores);
          setStore({ choreList: data.chores });
          return true;
        } catch (error) {
          console.log("there's an error fetching the chores");
        }
      },
      postChore: async (chore, date, duration, email) => {
        const store = getStore();
        const actions = getActions();
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            chore: chore,
            date: date,
            duration: duration + ":00",
          }),
        };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/chore" + `?email=${store.email}`,

            opts
          );

          if (resp.status !== 201) {
            alert("error before initial 201 request");

            return false;
          }
          const data = await resp.json();
          console.log("this came from the backend", data);
          actions.getChoresByUserEmail();
          return true;
        } catch (error) {
          console.log("there's an error adding the chore to the DB");
        }
      },

      deleteChoresByUserEmail: async (chore_id) => {
        const store = getStore();
        const actions = getActions();
        const opts = {
          method: "DELETE",
        };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL +
              "/api/chore" +
              `?email=${store.email}&chore_id=${chore_id}`,
            opts
          );

          if (resp.status !== 201) {
            alert("error before initial 201 request");

            return false;
          }
          const data = await resp.json();
          console.log("this came from the backend", data);
          actions.getChoresByUserEmail();
          return true;
        } catch (error) {
          console.log("there's an error deleting the chore");
        }
      },

      // function to add to a team
      postTeam: async (name, email) => {
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            name: name,
          }),
        };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/team",
            // + `?email=${store.email}`
            opts
          );

          if (resp.status !== 201) {
            alert("error before initial 201 request");

            return false;
          }
          const data = await resp.json();
          setStore({ team: data.team });
          console.log("this came from the backend", data);
          return true;
        } catch (error) {
          console.log("there's an error adding the person to the team DB");
        }
      },
      //get request to get the saved team from the backend
      getTeamByUserEmail: async () => {
        const store = getStore();
        const opts = { method: "GET" };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/team" + `?email=${store.email}`,
            opts
          );

          if (resp.status !== 200) {

            return false;
          }
          const data = await resp.json();
          console.log("here's the user's team", data.team);

          setStore({ team: data.team });
          localStorage.setItem("team", data.team);
          return true;
        } catch (error) {
          console.log("there's an error fetching the team");
        }
      },

      setTeam: () => {
        const team = localStorage.getItem("team") || null;
        console.log("this is your team", team);

        setStore({ team });
      },
      // to get all metrics, filter by user.id and team.id and make the calculation
      getChoresfromUsersInTeam: async () => {
        const store = getStore();
        const opts = { method: "GET" };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL +
              "/api/choresofteam" +
              `?team=${store.team}`,
            opts
          );

          if (resp.status !== 200) {
            alert("error before initial 200 request of GET request");

            return false;
          }
          const data = await resp.json();
          console.log(
            "here is the response from the choresofteam request",
            data.teamChores
          );
          setStore({ teamChoreList: data.teamChores });

          return true;
        } catch (error) {
          console.log("there's an error fetching the choresofteam data");
        }
      },

      //delete a user from a team
      deleteUserFromTeam: async () => {
        const store = getStore();
        const opts = {
          method: "DELETE",
        };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/team" + `?email=${store.email}`,
            opts
          );

          if (resp.status !== 201) {
            alert("error before initial 201 request");

            return false;
          }
          const data = await resp.json();
          console.log("this came from the backend", data);
          setStore({ team: null });
          return true;
        } catch (error) {
          console.log("there's an error deleting the user from the team");
        }
      },

      //get a list of users that belong to team and then query the chores that belong to the user.id

      deleteAllChores: async () => {
        const store = getStore();
        const actions = getActions();
        const opts = {
          method: "DELETE",
        };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/chores" + `?email=${store.email}`,
            opts
          );

          if (resp.status !== 201) {
            alert("error before initial 201 request");

            return false;
          }
          const data = await resp.json();
          console.log("this came from the backend", data);
          actions.getChoresByUserEmail();
          return true;
        } catch (error) {
          console.log("there's an error deleting the chore");
        }
      },

      // reset PW email post request
      forgotPasswordRequest: async (email) => {
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
          }),
        };

        try {
          const resp = await fetch(
            
            process.env.BACKEND_URL + "/api/forgot-password" + `?email=${email}`,
            opts
          );

          return true;
        } catch (error) {
          console.log("error requesting the email");
        }
      },

      // 
      resetPasswordRequest: async (email, token) => {
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json", 
          Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2MDEzOTMzNCwianRpIjoiYzZjNjA3ZmEtNjg0MC00Y2MyLThiMjEtMWJiZGE5ZTgwZjFmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjNAMy5jb20iLCJuYmYiOjE2NjAxMzkzMzQsImV4cCI6MTY2MDE0MDIzNH0.8F-WD-ILXHTubpg4KWOLyNT9iyqN12y07BUsRF50tTE"},
          body: JSON.stringify({
            email: email
          }),
        };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/reset-password",
            
            opts
          );
           
          return true;
        } catch (error) {
          console.log("error resetting the password");
        }
      },

    },
  };
};

export default getState;
