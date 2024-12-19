import 'package:flutter/material.dart' hide Banner;
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:realworld_flutter/api/model/article_submission.dart';
import 'package:realworld_flutter/blocs/article/bloc.dart';
import 'package:realworld_flutter/blocs/user/bloc.dart';
import 'package:realworld_flutter/layout.dart';
import 'package:realworld_flutter/localizations/rw_localizations.dart';
import 'package:realworld_flutter/model/article.dart';
import 'package:realworld_flutter/pages/article/article_form.dart';
import 'package:realworld_flutter/screens/profile.dart';
import 'package:realworld_flutter/widgets/rounded_button.dart';
import 'package:realworld_flutter/widgets/scroll_page.dart';

import 'article.dart';

class ArticleEditorScreen extends StatefulWidget {
  static const String route = '/article_editor';

  final String slug;
  final UserBloc userBloc;

  const ArticleEditorScreen({super.key, 
    @required this.slug,
    @required this.userBloc,
  });

  @override
  _ArticleEditorScreenState createState() => _ArticleEditorScreenState();
}

class _ArticleEditorScreenState extends State<ArticleEditorScreen> {
  ArticleBloc _articleBloc;

  @override
  void initState() {
    _articleBloc = BlocProvider.of<ArticleBloc>(context);

    _articleBloc.add(LoadArticleEvent(slug: widget.slug));
  
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final locale = RWLocalizations.of(context);
    final user = widget.userBloc.getCurrentUser();

    return BlocListener(
      bloc: _articleBloc,
      listener: (_, __) => {},
      condition: (_, ArticleState state) {
        if (state is ArticleSaved) {
          Navigator.of(context).popAndPushNamed(
            ArticleScreen.route,
            arguments: {
              'slug': state.article.slug,
            },
          );

          return false;
        }

        return true;
      },
      child: Layout(
        child: ScrollPage(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              const SizedBox(height: 12),
              BlocBuilder(
                bloc: _articleBloc,
                builder: (BuildContext context, ArticleState state) {
                  Object error;
                  Article article;
                  if (state is ArticleError) {
                    error = state.error;
                  } else if (state is ArticleLoading ||
                      (state is ArticleUninitialized)) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  } else if (state is ArticleLoaded) {
                    article = state.article;
                  }

                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12.0),
                    child: Column(
                      children: <Widget>[
                        ArticleForm(
                          article: article,
                          onSave: _saveForm,
                          error: error.toString(),
                        ),
                        RoundedButton(
                          text: locale.articleRemoveArticle,
                          onPressed: () => _articleBloc.add(
                            DeleteArticleEvent(
                              slug: widget.slug,
                              onComplete: () {
                                Navigator.of(context).pushReplacementNamed(
                                  ProfileScreen.route,
                                  arguments: {
                                    'username': user.username,
                                  },
                                );
                              },
                            ),
                          ),
                        )
                      ],
                    ),
                  );
                },
              )
            ],
          ),
        ),
      ),
    );
  }

  void _saveForm(ArticleSubmission article) {
    _articleBloc.add(
      UpdateArticleEvent(
          slug: widget.slug,
          article: article,
          onComplete: () => _onComplete(context, widget.slug)),
    );
    }

  void _onComplete(BuildContext context, String slug) {
    Navigator.of(context).pop();
  }
}
