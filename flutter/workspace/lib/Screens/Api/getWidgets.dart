import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:area_app/globals.dart' as globals;

Future<Map<String, dynamic>> getWidgets() async {
  String token = globals.token;
  String username = globals.userName;

  final String url = '/users/' + username + '/areas';
  final Map<String, String> header = {
    'Authorization': 'Bearer ' + token,
  };
  final Uri uri = Uri.https(
    globals.ngrokUri,
    url, // id ??
  );
  final http.Response response = await http.get(uri, headers: header);
  if (response.statusCode == 200) {
    final Map<String, dynamic> json =
        await jsonDecode(response.body) as Map<String, dynamic>;
    return json;
  } else {
    throw Exception('Failed to get login');
  }
}
