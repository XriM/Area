import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:area_app/globals.dart' as globals;

Future<Map<String, dynamic>> getWidgets(String _email, String _password) async {
  String token = globals.token;

  final Map<String, String> header = {
    'Authorization': 'Bearer ' + token,
  };
  final Uri url = Uri.https(
    '',
    '/users/:id/areas/:id', // id ??
  );
  final http.Response response = await http.get(url, headers: header);
  if (response.statusCode == 200) {
    final Map<String, dynamic> json =
        await jsonDecode(response.body) as Map<String, dynamic>;
    return json;
  } else {
    throw Exception('Failed to get login');
  }
}
