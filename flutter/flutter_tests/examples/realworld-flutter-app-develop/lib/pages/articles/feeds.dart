import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:realworld_flutter/blocs/articles/bloc.dart';
import 'package:realworld_flutter/helpers/collection.dart';
import 'package:realworld_flutter/repositories/articles/repository.dart';
import 'package:realworld_flutter/screens/home.dart';

import 'feed.dart';

class Feeds extends StatefulWidget {
  final List<FeedModel> feeds;
  final String initialFeed;
  final Widget header;
  final double minExtentHeader;
  final double maxExtentHeader;
  final bool pinned;

  Feeds({super.key, 
    @required this.feeds,
    this.header,
    this.pinned = false,
    this.initialFeed,
    this.minExtentHeader = 90.0,
    this.maxExtentHeader = 140.0,
  }) : assert(feeds.isNotEmpty);

  @override
  _FeedsState createState() => _FeedsState();
}

class _FeedsState extends State<Feeds> with SingleTickerProviderStateMixin {
  TabController _tabController;

  final Map<String, ArticlesBloc> _blocs = {};

  ScrollController _scrollController;

  @override
  void initState() {
    _scrollController = ScrollController();

    final initialIndex = widget.initialFeed != null
        ? widget.feeds
            .indexWhere((FeedModel feed) => feed.id == widget.initialFeed)
        : 0;

    _tabController = TabController(
      length: widget.feeds.length,
      initialIndex: initialIndex == -1 ? 0 : initialIndex,
      vsync: this,
    );

    super.initState();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _tabController.dispose();
    for (var cachedBloc in _blocs.values) {
      cachedBloc.close();
    }
    _blocs.clear();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return NestedScrollView(
      controller: _scrollController,
      headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
        return <Widget>[
          SliverPersistentHeader(
            pinned: widget.pinned,
            delegate: HeroHeader(
              minExtent: widget.minExtentHeader,
              maxExtent: widget.maxExtentHeader,
              child: widget.header,
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12.0),
              child: Container(
                child: TabBar(
                  controller: _tabController,
                  tabs: widget.feeds
                      .map((feed) => Tab(text: feed.label))
                      .toList(),
                ),
              ),
            ),
          ),
        ];
      },
      body: Builder(
        builder: (BuildContext context) {
          final innerScrollController = PrimaryScrollController.of(context);

          return SizedBox(
            height: 300,
            child: AnimatedBuilder(
              animation: _tabController.animation,
              builder: (BuildContext context, snapshot) {
                return TabBarView(
                  controller: _tabController,
                  children: mapWithIndex(
                    widget.feeds,
                    (FeedModel feed, int index) {
                      return feed.child;
                                        },
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }

  ArticlesBloc getArticlesBloc(FeedModel feed) {
    if (!_blocs.containsKey(feed.label)) {
      return _blocs[feed.label] = ArticlesBloc(
        articlesRepository: RepositoryProvider.of<ArticlesRepository>(context),
      );
    }
    return _blocs[feed.label];
  }
}

class FeedTabs implements SliverPersistentHeaderDelegate {
  @override
  double maxExtent;
  @override
  double minExtent;

  final List<Feed> feeds;
  final TabController controller;

  FeedTabs({
    @required this.minExtent,
    @required this.maxExtent,
    @required this.feeds,
    @required this.controller,
  });

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12.0),
      child: Container(
        child: TabBar(
          controller: controller,
          tabs: feeds.map((feed) => Tab(text: feed.label)).toList(),
        ),
      ),
    );
  }

  @override
  bool shouldRebuild(SliverPersistentHeaderDelegate oldDelegate) {
    return true;
  }

  @override
  FloatingHeaderSnapConfiguration get snapConfiguration => null;

  @override
  OverScrollHeaderStretchConfiguration get stretchConfiguration => null;
}
