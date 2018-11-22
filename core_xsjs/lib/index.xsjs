function train() {
	var alg = parseInt($.request.parameters.get("algorithm"));
	if (alg > 0 && alg < 4) {
		var conn;
		conn = $.hdb.getConnection();
		var fn = conn.loadProcedure("ML_Repo_WebService.db.procedures::train_class_dt");
		var fnResult = fn(alg);
		conn.commit();
		conn.close();
		$.response.setBody("Training finished.");
		$.response.status = $.net.http.OK;
	} else {
		$.response.setBody("ERROR: train Algorithm must be 1, 2 or 3.");
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	}
}

function predict() {
	var conn;
	conn = $.hdb.getConnection();
	var fn = conn.loadProcedure("ML_Repo_WebService.db.procedures::predict_class_dt.hdbprocedure");
	fn();
	conn.commit();
	conn.close();
	$.response.setBody("Prediction finished.");
	$.response.status = $.net.http.OK;
}

function upload() {
	var conn = $.hdb.getConnection();
	var fn = conn.loadProcedure("ML_Repo_WebService.db.procedures::uploadModel_class_dt.hdbprocedure");
	fn();
	conn.commit();
	conn.close();
	$.response.setBody("Prediction finished.");
	$.response.status = $.net.http.OK;
}

var cmd = $.request.parameters.get("cmd");
switch (cmd) {
	case "train":
		train();
		break;
	case "predict":
		predict();
		break;
	case "upload":
		upload();
		break;
	default:
		$.response.setBody("Invalid Command: " + cmd);
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
}
