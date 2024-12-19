import 'package:flutter/material.dart';
import 'package:realworld_flutter/helpers/date.dart';
import 'package:realworld_flutter/screens/profile.dart';
import 'package:realworld_flutter/widgets/user_avatar.dart';

class ArticleMeta extends StatelessWidget {
  final String avatar;
  final String author;
  final DateTime date;
  final Color color;

  const ArticleMeta({super.key, 
    this.avatar = '',
    this.author,
    this.date,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return InkWell(
      onTap: () => Navigator.of(context).pushNamed(
        ProfileScreen.route,
        arguments: {
          'username': author,
        },
      ),
      child: Row(
        children: <Widget>[
          UserAvatar(avatar: avatar),
          const SizedBox(width: 8),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                author,
                style: TextStyle(
                  color: color ?? theme.primaryColor,
                  fontFamily: 'SourceSansPro',
                  fontWeight: FontWeight.w500,
                ),
              ),
              Text(
                formatDate(date),
                style: TextStyle(
                  color: const Color(0XFFBBBBBB),
                  fontSize: 12,
                  fontFamily: 'SourceSansPro',
                  fontWeight: FontWeight.w300,
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
