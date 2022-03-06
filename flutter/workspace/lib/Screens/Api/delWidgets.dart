import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:area_app/globals.dart' as globals;

delWidgets(String areaId) async {
  String token = globals.token;

  final Map<String, String> header = {
    'Authorization': 'Bearer ' + token,
  };
  final Uri url = Uri.https(
    globals.ngrokUri,
    '/users/' + globals.userName + '/areas/' + areaId,
  );
  await http.delete(url, headers: header);
  // await jsonDecode(response.body);
}
