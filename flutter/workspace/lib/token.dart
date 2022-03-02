import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

class Token {
  Token({
    required this.accessToken,
    required this.tokenType,
    required this.expiresIn,
    required this.scope,
    required this.refreshToken,
  });

  factory Token.fromJson(Map<String, dynamic> json) {
    return Token(
      accessToken: json['access_token'].toString(),
      tokenType: json['token_type'].toString(),
      expiresIn: json['expires_in'].toString(),
      scope: json['scope'].toString(),
      refreshToken: json['refresh_token'].toString(),
    );
  }
  factory Token.emptyToken() {
    return Token(
      accessToken: '',
      tokenType: '',
      expiresIn: '',
      scope: '',
      refreshToken: '',
    );
  }

  String get getAccessToken {
    return accessToken;
  }

  String get getTokenType {
    return tokenType;
  }

  String get getExpiresIn {
    return expiresIn;
  }

  String get getScope {
    return scope;
  }

  String get getRefreshToken {
    return refreshToken;
  }

  final String accessToken;
  final String tokenType;
  final String expiresIn;
  final String scope;
  final String refreshToken;
}

Future<Token> fetchEmptyToken() async {
  return Token.emptyToken();
}

Future<Token> fetchToken(String code) async {
  const String username = '_AH7eByuCQvZ7TW_NpKGUg';
  const String password = '';
  final String basicAuth =
      'Basic ' + base64Encode(utf8.encode('$username:$password'));

  const String grantType = 'authorization_code';
  const String redirectUri = 'http://localhost:8080';
  final String data = 'grant_type=' +
      grantType +
      '&code=' +
      code +
      '&redirect_uri=' +
      redirectUri;

  final http.Response response = await http.post(
      Uri.https('www.reddit.com', '/api/v1/access_token'),
      headers: <String, String>{
        'authorization': basicAuth,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data);

  print(response.statusCode);
  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    final Map<String, dynamic> res =
        await jsonDecode(response.body) as Map<String, dynamic>;
    return Token.fromJson(res);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to access token');
  }
}
