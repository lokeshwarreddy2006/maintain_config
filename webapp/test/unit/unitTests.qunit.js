/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comsappimd/maintain_config/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
