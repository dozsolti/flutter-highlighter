import 'package:flutter/material.dart';

class MenuItem {
  final String id;
  final String label;
  final IconData icon;

  MenuItem({
    @required this.id,
    @required this.label,
    this.icon,
  });
}

class DropdownMenu extends StatefulWidget {
  final List<MenuItem> items;
  final ValueChanged<MenuItem> onSelect;

  const DropdownMenu({super.key, 
    this.items,
    this.onSelect,
  });

  @override
  State<StatefulWidget> createState() {
    return DropdownMenuState();
  }
}

class DropdownMenuState extends State<DropdownMenu> {
  List<DropdownMenuItem<MenuItem>> _dropDownMenuItems;

  @override
  void initState() {
    _dropDownMenuItems = buildAndGetDropDownMenuItems(widget.items);
    super.initState();
  }

  List<DropdownMenuItem<MenuItem>> buildAndGetDropDownMenuItems(
    List<MenuItem> items,
  ) {
    final items0 = <DropdownMenuItem<MenuItem>>[];

    for (var item in items) {
      items0.add(
        DropdownMenuItem(
            value: item,
            child: Row(
              children: <Widget>[
                Icon(item.icon),
                const SizedBox(width: 10),
                Text(item.label),
              ],
            )),
      );
    }

    return items0;
  }

  @override
  Widget build(BuildContext context) {
    final iconColor = Theme.of(context).primaryColorDark;

    return Container(
      child: DropdownButton(
          icon: Icon(
            Icons.more_vert,
            color: iconColor,
          ),
          underline: Container(),
          items: _dropDownMenuItems,
          onChanged: (MenuItem item) {
            setState(() {
              widget.onSelect(item);
            });
          }),
    );
  }
}
