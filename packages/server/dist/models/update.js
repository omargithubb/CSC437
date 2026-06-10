export default function update(model, message, user) {
    const [type, payload] = message;
    switch (type) {
        case "routes/request":
            if (model.routes)
                break;
            return [
                { ...model },
                fetchRoutes(user)
            ];
        case "routes/load":
            return { ...model, routes: payload.routes };
        default:
            throw new Error(`Unhandled message: "${type}"`);
    }
    return model;
}
function fetchRoutes(user) {
    const headers = user?.token
        ? { Authorization: `Bearer ${user.token}` }
        : {};
    return fetch("/api/routes", { headers })
        .then(res => {
        if (res.status === 200)
            return res.json();
        throw "No response from server";
    })
        .then(json => {
        return ["routes/load", { routes: json }];
    });
}
