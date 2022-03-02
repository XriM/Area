import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:area_app/globals.dart' as globals;

Future<Map<String, dynamic>> getLogin(String _email, String _password) async {
  // String token = globals.token;

  final Map<String, String> body = {
    'email': _email,
    'password': _password,
  };
  final Uri url = Uri.https(
    '',
    '/users/login',
  );
  final http.Response response = await http.post(url, body: body);
  if (response.statusCode == 200) {
    final Map<String, dynamic> json =
        await jsonDecode(response.body) as Map<String, dynamic>;
    return json;
  } else {
    throw Exception('Failed to get login');
  }
}