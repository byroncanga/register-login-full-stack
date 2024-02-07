const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: [],
    },
    actions: {
      userList: async () => {
        try {
          const token = localStorage.getItem("auth_token");

          if (token) {
            const response = await fetch(process.env.BACKEND_URL + "api/user", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            const data = await response.json();

            if (!response.ok) {
              console.log("Error loading message from backend:", data.error);
              return null;
            }
            setStore({ user: data.user });
            return data;
          } else {
            console.log("Authentication token not found");
            // Redireccionar al login o manejar de otra manera
          }
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      createUser: async (newUser) => {
        const response = await fetch(process.env.BACKEND_URL + "api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (!response.ok) {
          console.log("error al enviar");
        } else {
          const data = await response.json();
          return data;
        }
      },

      loginUser: async (User) => {
        const response = await fetch(process.env.BACKEND_URL + "api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(User),
        });

        if (!response.ok) {
          console.log("error de credenciales");
        } else {
          const data = await response.json();
          if (data.auth_token) {
            localStorage.setItem("auth_token", data.auth_token);
          }
          return data;
        }
      },
      logout: () => {
        localStorage.removeItem("auth_token");
      },
    },
  };
};

export default getState;
