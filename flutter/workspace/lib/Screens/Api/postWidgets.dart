import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:area_app/globals.dart' as globals;

Future<Map<String, dynamic>> createArea() async {
  final Map<String, String> header = {
    'acces_token': globals.token,
  };
  Map<String, dynamic> body =
      jsonCreator(globals.serviceName, globals.reactionName);

  print("--------------------");
  print(body);
  print("--------------------");

  return {};

  // final Uri url = Uri.https(
  //   '',
  //   '/users/' + globals.userName + '/areas/',
  // );
  // final http.Response response = await http.post(
  //   url,
  //   headers: header,
  //   body: body,
  // );
  // if (response.statusCode == 200) {
  //   final Map<String, dynamic> json =
  //       await jsonDecode(response.body) as Map<String, dynamic>;
  //   return json;
  // } else {
  //   throw Exception('Failed to get login');
  // }
}

Map<String, dynamic> jsonCreator(String serviceName, String reactionName) {
  Map<String, dynamic> body = {};

  if (globals.serviceName == 'Steam') {
    body = globals.steamPara;
  }
  if (globals.serviceName == 'Github') {
    body = globals.githubPara;
  }
  if (globals.serviceName == 'Weather') {
    print("le weather");
    body = globals.weatherPara;
  }
  if (globals.serviceName == 'Crypto') {
    body = globals.cryptoPara;
  }
  if (globals.serviceName == 'Outlook') {
    body = globals.outlookPara;
  }
  if (globals.reactionName == 'Trello') {
    body.addAll(globals.trelloPara);
  }
  if (globals.reactionName == 'Sheets') {
    body.addAll(globals.sheetsPara);
  }
  if (globals.reactionName == 'Discord') {
    body.addAll(globals.discordPara);
  }
  if (globals.reactionName == 'Outlook') {
    print(globals.emailPara);
    body.addAll(globals.emailPara);
  }
  if (globals.reactionName == 'Twilio') {
    body.addAll(globals.twilioPara);
  }
  if (globals.reactionName == 'Github') {
    print("le github rea");
    print(globals.githubParaR);
    body.addAll(globals.githubParaR);
  }
  print("--------------------");
  print(body);
  print("--------------------");
  return body;
}
