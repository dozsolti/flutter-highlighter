import 'package:flutter/material.dart';
import 'package:realworld_flutter/layout.dart';
import 'package:realworld_flutter/localizations/rw_localizations.dart';
import 'package:realworld_flutter/pages/signup_form.dart';
import 'package:realworld_flutter/screens/sign_in.dart';
import 'package:realworld_flutter/widgets/scroll_page.dart';

class SignUpScreen extends StatelessWidget {
  static const String route = '/sign_up';

  const SignUpScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final locale = RWLocalizations.of(context);
    final theme = Theme.of(context);
    return Layout(
      child: ScrollPage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            const SizedBox(height: 12),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12.0),
              child: Column(
                children: <Widget>[
                  Text(
                    locale.userSignUp,
                    style: theme.textTheme.titleLarge.copyWith(
                      fontSize: 28,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 12),
                  InkWell(
                      onTap: () {
                        Navigator.of(context)
                            .pushReplacementNamed(SignInScreen.route);
                      },
                      child: Text(
                        locale.userSignUpHaveAccount,
                        style: theme.textTheme.titleSmall,
                      ))
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: SignUpForm(),
              margin: null,
            ),
          ],
        ),
      ),
    );
  }
}
