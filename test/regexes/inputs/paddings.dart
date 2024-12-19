import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:location/location.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final Location location = Location();

  LocationData? _location;
  StreamSubscription<LocationData>? _locationSubscription;
  String? _error;

  Future<void> _listenLocation() async {
    location.changeSettings(accuracy: LocationAccuracy.high);

    _locationSubscription =
        location.onLocationChanged.handleError((dynamic err) {
      if (err is PlatformException) {
        setState(() {
          _error = err.code;
        });
      }
      _locationSubscription?.cancel();
      setState(() {
        _locationSubscription = null;
      });
    }).listen((currentLocation) {
      setState(() {
        _error = null;

        _location = currentLocation;
      });
    });
    setState(() {});
  }

  Future<void> _stopListen() async {
    await _locationSubscription?.cancel();
    setState(() {
      _locationSubscription = null;
    });
  }

  @override
  void dispose() {
    _locationSubscription?.cancel();
    setState(() {
      _locationSubscription = null;
    });
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Spidro",
          style: TextStyle(fontStyle: FontStyle.italic),
        ),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Container(
                  margin: const EdgeInsets.only(right: 42),
                  child: ElevatedButton(
                    onPressed:
                        _locationSubscription == null ? _listenLocation : null,
                    child: const Text('Listen'),
                  ),
                ),
                ElevatedButton(
                  onPressed: _locationSubscription != null ? _stopListen : null,
                  child: const Text('Stop'),
                ),
              ],
            ),
            padding: const EdgeInsets.all(16),
          ),
        ],
      ),
    );
  }
}
