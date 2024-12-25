
  <pre style="background-color: darkblue; padding: 10px 0; margin-bottom: 24px">
    &quot; AlertDialog(
            title: &quot;
  </pre>
  

  <pre style="background-color: darkblue; padding: 10px 0; margin-bottom: 24px">
    &quot;,
            titlePadding: EdgeInsets.only(
                left: 20.0, right: 20.0, top: 20.0),
            contentPadding: EdgeInsets.symmetric(horizontal: 20.0),
            content: AboutContent(),
            actions: &lt;Widget&gt;[
              Container(
                  width: 100.0,
                  child: RaisedButton(
                    color: Colors.green,
                    textColor: Colors.white,
                    child: Text(&#039;CLOSE&#039;,
                        textAlign: TextAlign.center,
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                  ))
            ],
          )&quot;
  </pre>
  

  <pre style="background-color: darkblue; padding: 10px 0; margin-bottom: 24px">
    &quot; AlertDialog(
            title: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: &lt;Widget&gt;[
                Text(&#039;Conduit&#039;,
                    style: TextStyle(
                        fontSize: 30.0,
                        fontWeight: FontWeight.bold,
                        color: Colors.green))
              ],
            ),
            titlePadding: EdgeInsets.only(
                left: 20.0, right: 20.0, top: 20.0),
            contentPadding: EdgeInsets.symmetric(horizontal: 20.0),
            content: AboutContent(),
            actions: &lt;Widget&gt;&quot;
  </pre>
  

  <pre style="background-color: darkblue; padding: 10px 0; margin-bottom: 24px">
    &quot;
            ],
          )&quot;
  </pre>
  
