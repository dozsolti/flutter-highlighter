import 'package:flutter/material.dart';
import 'package:realworld_flutter/localizations/rw_localizations.dart';
import 'package:realworld_flutter/version.dart';
import 'package:realworld_flutter/widgets/external_link.dart';

void about(BuildContext context) {
  final themeData = Theme.of(context);
  final locale = RWLocalizations.of(context);
  final aboutTextStyle = themeData.textTheme.bodyLarge;
  final linkStyle =
      themeData.textTheme.bodyLarge.copyWith(color: themeData.colorScheme.secondary);

  showAboutDialog(
    context: context,
    applicationName: locale.appName,
    /*
      applicationIcon: Image.asset(
        'assets/images/conduit.png',
        width: 40.0,
        height: 40.0,
      ),
      *
       */
    applicationVersion: 'Version: $version',
    applicationLegalese: '© ${DateTime.now().year} ${locale.appName}',
    children: <Widget>[
      Padding(
        padding: const EdgeInsets.only(top: 24.0),
        child: RichText(
          text: TextSpan(
            children: <TextSpan>[
              TextSpan(
                style: aboutTextStyle,
                text: locale.aboutMessage,
              ),
              ExternalLink(
                style: linkStyle,
                url: 'https://github.com/rhalff/realworld-flutter-app',
                text: locale.aboutVisitRepo,
              ),
            ],
          ),
        ),
      ),
    ],
  );
}
