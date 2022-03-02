import 'package:google_sign_in/google_sign_in.dart';

class GoogleSignInApi {
  static List<String> scopes = [
    'email',
    'https://www.googleapis.com/auth/youtube', // Youtube scope
    'https://www.googleapis.com/auth/youtube.force-ssl'
  ];

  static final _googleSignIn = GoogleSignIn(
    scopes: scopes,
  );

  static Future<GoogleSignInAccount?> login() => _googleSignIn.signIn();

  static Future logout() => _googleSignIn.disconnect();
}
