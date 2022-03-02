import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:area_app/globals.dart' as globals;

Future<Map<String, dynamic>> createArea() async {
  final Map<String, String> header = {
    'acces_token': globals.token,
  };
  Map<String, dynamic> body =
      jsonCreator(globals.serviceName, globals.reactionName);

  // return {};

  final Uri url = Uri.https(
    '',
    '/users/' + globals.userName + '/areas/',
  );
  final http.Response response = await http.post(
    url,
    headers: header,
    body: body,
  );
  if (response.statusCode == 200) {
    final Map<String, dynamic> json =
        await jsonDecode(response.body) as Map<String, dynamic>;
    return json;
  } else {
    throw Exception('Failed to create AREA');
  }
}

Map<String, dynamic> jsonCreator(String serviceName, String reactionName) {
  Map<String, dynamic> body = {};
  Map<String, dynamic> finalBody = {};
  int actionId = 0;
  int reactionId = 0;

  if (globals.serviceName == 'Steam') {
    body = globals.steamPara;
    print("la");
    print(body);
    actionId = globals.steamValues[1] as int;
  }
  if (globals.serviceName == 'Github') {
    body = globals.githubPara;
    actionId = globals.githubValues[1] as int;
  }
  if (globals.serviceName == 'Weather') {
    body = globals.weatherPara;
    actionId = globals.weatherValues[1] as int;
  }
  if (globals.serviceName == 'Crypto') {
    body = globals.cryptoPara;
    actionId = globals.cryptoValues[1] as int;
  }
  if (globals.serviceName == 'Outlook') {
    body = globals.outlookPara;
    actionId = globals.outlookValues[1] as int;
  }
  if (globals.serviceName == 'Youtube') {
    body = globals.youtubePara;
    actionId = globals.youtubeValues[1] as int;
  }
  if (globals.serviceName == 'Reddit') {
    body = globals.redditPara;
    actionId = globals.redditValues[1] as int;
  }
  if (globals.serviceName == 'One Drive') {
    body = globals.oneDrivePara;
    actionId = globals.oneDriveValues[1] as int;
  }
  if (globals.reactionName == 'Trello') {
    body.addAll(globals.trelloPara);
    reactionId = globals.trelloValues[1] as int;
  }
  if (globals.reactionName == 'Discord') {
    body.addAll(globals.discordPara);
    reactionId = globals.discordValues[1] as int;
  }
  if (globals.reactionName == 'Outlook') {
    body.addAll(globals.outlookParaR);
    reactionId = globals.outlookValuesR[1] as int;
  }
  if (globals.reactionName == 'Github') {
    body.addAll(globals.githubParaR);
    reactionId = globals.githubValuesR[1] as int;
  }
  finalBody = {
    "action_id": actionId,
    "reaction_id": reactionId,
    "name": serviceName + " + " + reactionName,
    "config": [body]
  };
  print("--------------------");
  print(body);
  print("--------------------");

  print("--------------------");
  print(finalBody);
  print("--------------------");
  return finalBody;
}
