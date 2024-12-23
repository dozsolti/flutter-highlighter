import 'package:flutter/material.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  get loginBloc => null;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SizedBox(
            height: MediaQuery.of(context).size.height,
            child: Stack(
              children: <Widget>[
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                      child: Row(
                        children: <Widget>[
                          Expanded(
                            child: Image.asset('images/flutter_realworld.png'),
                          )
                        ],
                      ),
                      margin: const EdgeInsets.only(
                          left: 20.0, right: 40.0, bottom: 40.0),
                    ),
                    Container(
                        margin: const EdgeInsets.only(
                            left: 20.0, right: 40.0, bottom: 40.0),
                        child: Row(
                          children: <Widget>[
                            Expanded(
                              child:
                                  Image.asset('images/flutter_realworld.png'),
                            )
                          ],
                        )),
                    Expanded(
                        child: Container(
                      width: 2,
                    )),
                    Text("hello world"),
                    Container(
                        margin: const EdgeInsets.only(
                            left: 40.0, right: 40.0, bottom: 10.0),
                        decoration: const BoxDecoration(
                            border: Border(
                                bottom: BorderSide(
                                    width: 1.0, color: Colors.grey))),
                        child: emailField()),
                    Container(
                        margin: const EdgeInsets.only(
                            left: 40.0, right: 40.0, bottom: 10.0),
                        decoration: const BoxDecoration(
                            border: Border(
                                bottom: BorderSide(
                                    width: 1.0, color: Colors.grey))),
                        child: passwordField()),
                    Container(
                        margin: const EdgeInsets.only(left: 40.0, right: 40.0),
                        child: Row(
                          children: <Widget>[
                            Expanded(
                                child: RaisedButton(
                              color: Colors.green,
                              textColor: Colors.white,
                              child: const Text('LOGIN',
                                  textAlign: TextAlign.center,
                                  style:
                                      TextStyle(fontWeight: FontWeight.bold)),
                              onPressed: () {
                                loginBloc.login().then((_) {
                                  Navigator.pop(context, Account.login);
                                });
                              },
                            ))
                          ],
                        )),
                  ],
                ),
                Container(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                      Container(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: <Widget>[
                            Container(
                              margin: const EdgeInsets.only(bottom: 20.0),
                              child: Column(
                                children: <Widget>[
                                  Container(
                                    child: Row(
                                      children: <Widget>[
                                        const Text('Don\'t have an account? ',
                                            style:
                                                TextStyle(color: Colors.grey)),
                                        GestureDetector(
                                          onTap: () {
                                            Navigator.pop(
                                                context, Account.register);
                                            Navigator.push(
                                              context,
                                              MaterialPageRoute(
                                                  builder: (context) =>
                                                      const RegisterScreen()),
                                            );
                                          },
                                          child: const Text("Register",
                                              style: const TextStyle(
                                                  color: Colors.green,
                                                  fontWeight: FontWeight.bold)),
                                        )
                                      ],
                                    ),
                                  ),
                                  IconButton(
                                      icon: const Icon(Icons.home,
                                          color: Colors.grey),
                                      onPressed: () {
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) =>
                                                  const HomeScreen()),
                                        );
                                      })
                                ],
                              ),
                            )
                          ],
                        ),
                      )
                    ],
                  ),
                )
              ],
            )));
  }

  RaisedButton(
      {required MaterialColor color,
      required Color textColor,
      required Text child,
      required Null Function() onPressed}) {}
}

emailField() {}

passwordField() {}

class Account {
  static var register;

  static var login;
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}