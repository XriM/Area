import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:area_app/globals.dart' as globals;

Future<Map<String, dynamic>> createArea() async {
  final Map<String, String> header = {
    'Authorization': 'Bearer ' + globals.token,
  };

  print('createArea');
  print('createArea');
  print('createArea');

  Map<String, dynamic> tempBody = jsonCreatorArea();

  Map<String, String> body =
      tempBody.map((key, value) => MapEntry(key, value.toString()));

  // return {};
  print(globals.token);

  print(body);

  final Uri url = Uri.https(
    globals.ngrokUri,
    '/users/' + globals.userName + '/areas',
  );
  print('---------------RESPONSE----------------');
  print(url);
  print(header);
  print(body);
  print(globals.token);
  print('---------------RESPONSE----------------');

  // print(body.runtimeType);
  // print(body.runtimeType);
  // print(body.runtimeType);
  // print(body.runtimeType);

  final http.Response response =
      await http.post(url, headers: header, body: body);

  print('---------------RESPONSE----------------');
  print(response.body);
  print('---------------RESPONSE----------------');
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
  print('------------createServiceA-----------');
  print(globals.userName);
  print(url);
  print(globals.token);
  print(header);
  print(body);
  print('------------createServiceA-----------');
  if (response.statusCode == 200) {
    final Map<String, dynamic> json =
        await jsonDecode(response.body) as Map<String, dynamic>;
    print(json);
    return json;
  } else {
    final Map<String, dynamic> json =
        await jsonDecode(response.body) as Map<String, dynamic>;
    print(json);
    return json;
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
  print('------------createServiceA-----------');
  print(globals.userName);
  print(url);
  print(globals.token);
  print(header);
  print(body);
  print('------------createServiceA-----------');
  if (response.statusCode == 200) {
    final Map<String, dynamic> json =
        await jsonDecode(response.body) as Map<String, dynamic>;
    print(json);
    return json;
  } else {
    final Map<String, dynamic> json =
        await jsonDecode(response.body) as Map<String, dynamic>;
    print(json);
    return json;
  }
}

Map<String, dynamic> jsonCreatorArea() {
  Map<String, dynamic> body = {};
  Map<String, dynamic> finalBody = {};
  String actionId = '';
  String reactionId = '';

  if (globals.serviceName == 'Steam') {
    body = globals.steamPara;
    actionId = globals.steamValuesId;
  }
  if (globals.serviceName == 'Github') {
    body = globals.githubPara;
    actionId = globals.githubValuesId;
  }
  if (globals.serviceName == 'Weather') {
    body = globals.weatherPara;
    actionId = globals.weatherValuesId;
  }
  if (globals.serviceName == 'Crypto') {
    body = globals.cryptoPara;
    actionId = globals.cryptoValuesId;
  }
  if (globals.serviceName == 'Outlook') {
    body = globals.outlookPara;
    actionId = globals.outlookValuesId;
  }
  if (globals.serviceName == 'Youtube') {
    body = globals.youtubePara;
    actionId = globals.youtubeValuesId;
  }
  if (globals.serviceName == 'Reddit') {
    body = globals.redditPara;
    actionId = globals.redditValuesId;
  }
  if (globals.serviceName == 'One Drive') {
    body = globals.oneDrivePara;
    actionId = globals.oneDriveValuesId;
  }
  if (globals.reactionName == 'Trello') {
    body.addAll(globals.trelloPara);
    reactionId = globals.trelloValuesId;
  }
  if (globals.reactionName == 'Discord') {
    body.addAll(globals.discordPara);
    reactionId = globals.discordValuesId;
  }
  if (globals.reactionName == 'Outlook') {
    body.addAll(globals.outlookParaR);
    reactionId = globals.outlookValuesRId;
  }
  if (globals.reactionName == 'Github') {
    body.addAll(globals.githubParaR);
    reactionId = globals.githubValuesRId;
  }
  finalBody = {
    "action_id": actionId,
    "reaction_id": reactionId,
    "name": globals.serviceName + " + " + globals.reactionName,
    "config": body
  };
  print("--------------------");
  print(body);
  print("--------------------");

  print("--------------------");
  print(finalBody);
  print(finalBody.runtimeType);
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

  print("-------Service Action----------");
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
  print("-------Service Reaction----------");
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
