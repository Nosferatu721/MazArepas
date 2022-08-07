const Handlebars = require("handlebars");

Handlebars.registerHelper("isAdministradorSupervisor", (value) => {
	return value === "Administrador" || value === "Supervisor" || value === 'Reporting';
});

Handlebars.registerHelper("isAdministradorAsesor", (value) => {
	return value === "Administrador" || value === "Asesor";
});

Handlebars.registerHelper("isAdministradorReporting", (value) => {
	return value === "Administrador" || value === "Reporting";
});

Handlebars.registerHelper("isAdministradorBackOffice", (value) => {
	return value === "Administrador" || value === "BackOffice";
});

Handlebars.registerHelper("isAseguradoYTomador", (value) => {
	return value === "SI";
});

Handlebars.registerHelper("isBeneficiarioYAsegurado", (value) => {
	return value === "SI";
});

Handlebars.registerHelper("isONEROSO", (value) => {
	return value === "ONEROSO";
});
