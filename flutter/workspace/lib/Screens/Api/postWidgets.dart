import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:area_app/globals.dart' as globals;

Future<Map<String, dynamic>> createArea() async {
  final Map<String, String> header = {
    'Authorization': 'Bearer ' + globals.token,
  };
  Map<String, dynamic> body =
      jsonCreatorArea(globals.serviceName, globals.reactionName);

  // return {};

  final Uri url = Uri.https(
    globals.ngrokUri,
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

Future<Map<String, dynamic>> createServiceA() async {
  final Map<String, String> header = {
    'Authorization': 'Bearer ' + globals.token,
  };
  Map<String, dynamic> body = jsonCreatorServiceA(globals.serviceName);

  final Uri url = Uri.https(
    globals.ngrokUri,
    '/users/' + globals.userName + '/services/' + serviceIdGetA(),
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

Future<Map<String, dynamic>> createServiceR() async {
  final Map<String, String> header = {
    'Authorization': 'Bearer ' + globals.token,
  };
  Map<String, dynamic> body = jsonCreatorServiceA(globals.reactionName);

  final Uri url = Uri.https(
    globals.ngrokUri,
    '/users/' + globals.userName + '/services/' + serviceIdGetR(),
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

Map<String, dynamic> jsonCreatorArea(String serviceName, String reactionName) {
  Map<String, dynamic> body = {};
  Map<String, dynamic> finalBody = {};
  int actionId = 0;
  int reactionId = 0;

  if (globals.serviceName == 'Steam') {
    body = globals.steamPara;
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

Map<String, dynamic> jsonCreatorServiceA(String serviceName) {
  Map<String, dynamic> body = {};

  if (globals.serviceName == 'Steam') body = {};
  if (globals.serviceName == 'Github') body = {'token': globals.githCode};
  if (globals.serviceName == 'Weather') body = {};
  if (globals.serviceName == 'Crypto') body = {};
  if (globals.serviceName == 'Outlook') body = {'token': globals.ootCode};
  if (globals.serviceName == 'Youtube') body = {'token': globals.googleToken};
  if (globals.serviceName == 'Reddit')
    body = {'token': globals.lastRedditToken};
  if (globals.serviceName == 'One Drive') body = {'token': globals.ootCode};

  print("--------------------");
  print(body);
  print("--------------------");

  return body;
}

Map<String, dynamic> jsonCreatorServiceR(String reactionName) {
  Map<String, dynamic> body = {};

  if (globals.reactionName == 'Trello') body = {};
  if (globals.reactionName == 'Discord') body = {};
  if (globals.reactionName == 'Outlook') body = {'token': globals.ootCode};
  if (globals.reactionName == 'Github') body = {'token': globals.githCode};
  print("--------------------");
  print(body);
  print("--------------------");

  return body;
}

String serviceIdGetA() {
  if (globals.serviceName == 'Steam') return globals.steamId;
  if (globals.serviceName == 'Github') return globals.gitHubId;
  if (globals.serviceName == 'Weather') return globals.weatherId;
  if (globals.serviceName == 'Crypto') return globals.cryptoId;
  if (globals.serviceName == 'Outlook') return globals.outlookId;
  if (globals.serviceName == 'Youtube') return globals.youtubeId;
  if (globals.serviceName == 'Reddit') return globals.redditId;
  if (globals.serviceName == 'One Drive') return globals.outlookId;
  return '';
}

String serviceIdGetR() {
  if (globals.reactionName == 'Trello') return globals.trelloId;
  if (globals.reactionName == 'Discord') return globals.discordId;
  if (globals.reactionName == 'Outlook') return globals.outlookId;
  if (globals.reactionName == 'Github') return globals.gitHubId;
  return '';
}
