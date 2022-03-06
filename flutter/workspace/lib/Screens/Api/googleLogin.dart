import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:area_app/globals.dart' as globals;

Future<Map<String, dynamic>> getgoogleLogin() async {
  // String token = globals.token;

  final Map<String, String> body = {
    'id_token': globals.googleIdToken,
  };
  final Uri url = Uri.https(
    globals.ngrokUri,
    'users/google_login',
  );

  final http.Response response = await http.post(url, body: body);
  print('BA');
  print('BA');
  print('BA');
  print('BA');
  print('BA');
  print('BA');
  print(body);
  print(url);
  print(response.body);

  if (response.statusCode == 200) {
    final Map<String, dynamic> json =
        await jsonDecode(response.body) as Map<String, dynamic>;
    return json;
  } else {
    final Map<String, dynamic> json =
        await jsonDecode(response.body) as Map<String, dynamic>;
    return json;
  }
}
