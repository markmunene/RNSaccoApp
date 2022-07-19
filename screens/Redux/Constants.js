// create a redux thunk for the login action

const login = () => {
    return async dispatch => {
        const response = await fetch(
        `http://${
            ipAddress
        }:8080/api/v1/login`,
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            username: 'admin',
            password: 'admin',
            }),
        }
        );
        const data = await response.json();
        if (data.status === 'success') {
        dispatch({
            type: 'LOGIN',
            payload: data.data,
        });
        }
    };
    }