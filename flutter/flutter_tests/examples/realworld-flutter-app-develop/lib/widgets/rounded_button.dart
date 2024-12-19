import 'package:flutter/material.dart';

class RoundedButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final TextStyle style;
  final Color backgroundColor;
  final EdgeInsetsGeometry padding;

  const RoundedButton({super.key, 
    @required this.text,
    this.onPressed,
    this.padding,
    this.style,
    this.backgroundColor,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return MaterialButton(
      onPressed: onPressed,
      color: backgroundColor ?? theme.colorScheme.secondary,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(4.0),
      ),
      child: Padding(
        padding: padding ?? const EdgeInsets.all(8.0),
        child: Text(
          text,
          style: theme.textTheme.button
              .copyWith(
                color: Colors.white,
              )
              .merge(style),
        ),
      ),
    );
  }
}
