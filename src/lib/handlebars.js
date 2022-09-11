const Handlebars = require("handlebars");

Handlebars.registerHelper("isAdminSupervisor", (value) => {
	return value === "Admin" || value === "Supervisor";
});

Handlebars.registerHelper("isAdminProduccion", (value) => {
	return value === "Admin" || value === "Produccion";
});

Handlebars.registerHelper("isAdminInventario", (value) => {
	return value === "Admin" || value === "Inventario";
});

Handlebars.registerHelper("isNullOrUndefined", (value) => {
	return value === undefined;
});
