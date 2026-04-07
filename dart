import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(scaffoldBackgroundColor: const Color(0xff040509)),
      home: const PortfolioPage(),
    );
  }
}

class PortfolioPage extends StatefulWidget {
  const PortfolioPage({super.key});
  @override
  State<PortfolioPage> createState() => _PortfolioPageState();
}

class _PortfolioPageState extends State<PortfolioPage> with SingleTickerProviderStateMixin {
  late final AnimationController _orbit;
  late final Timer _typing;
  final Random _rnd = Random(42);
  final List<Offset> _stars = List.generate(260, (_) => Offset(Random().nextDouble() * 1.2, Random().nextDouble() * 1.1));
  final List<String> _phrases = [
    'delightful mobile products',
    'smooth launch animations',
    'offline-first experiences',
    'pixel-perfect UIs',
  ];
  int _phrase = 0;
  int _cursor = 0;
  bool _deleting = false;
  String get _text => _phrases[_phrase].substring(0, _cursor);

  @override
  void initState() {
    super.initState();
    _orbit = AnimationController(vsync: this, duration: const Duration(seconds: 26))..repeat();
    _typing = Timer.periodic(const Duration(milliseconds: 70), (_) {
      setState(() {
        final current = _phrases[_phrase];
        if (!_deleting && _cursor < current.length) {
          _cursor++;
        } else if (_deleting && _cursor > 0) {
          _cursor--;
        } else if (!_deleting && _cursor == current.length) {
          _deleting = true;
          Future.delayed(const Duration(milliseconds: 900));
        } else {
          _deleting = false;
          _phrase = (_phrase + 1) % _phrases.length;
        }
      });
    });
  }

  @override
  void dispose() {
    _orbit.dispose();
    _typing.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Scaffold(
      body: Stack(
        children: [
          AnimatedBuilder(
            animation: _orbit,
            builder: (_, __) => CustomPaint(
              painter: SaturnPainter(
                stars: _stars,
                t: _orbit.value * 2 * pi,
              ),
              size: size,
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 32),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // nav (demo)
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(children: [
                        Container(width: 10, height: 10, decoration: const BoxDecoration(shape: BoxShape.circle, gradient: LinearGradient(colors: [Color(0xff6f9bff), Color(0xffc5f36b)]))),
                        const SizedBox(width: 10),
                        const Text('Boboxon', style: TextStyle(letterSpacing: 2, fontWeight: FontWeight.w700)),
                      ]),
                      Wrap(spacing: 18, children: const [
                        Text('Projects', style: TextStyle(color: Color(0xffb5bdd9))),
                        Text('About', style: TextStyle(color: Color(0xffb5bdd9))),
                        Text('Contact', style: TextStyle(color: Color(0xffb5bdd9))),
                        Text('GitHub', style: TextStyle(color: Color(0xffb5bdd9))),
                      ]),
                    ],
                  ),
                  const Spacer(),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.05),
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: Colors.white24, width: 0.7),
                    ),
                    child: const Text('Abdirimov Boboxon · Mobile Developer', style: TextStyle(color: Color(0xffb5bdd9))),
                  ),
                  const SizedBox(height: 18),
                  RichText(
                    text: TextSpan(
                      children: [
                        const TextSpan(
                          text: 'Creating ',
                          style: TextStyle(fontSize: 48, fontWeight: FontWeight.w700, height: 1.05),
                        ),
                        TextSpan(
                          text: _text,
                          style: const TextStyle(fontSize: 48, fontWeight: FontWeight.w700, color: Color(0xff6f9bff)),
                        ),
                        const TextSpan(text: '\nwith craft on ', style: TextStyle(fontSize: 48, fontWeight: FontWeight.w700)),
                        const TextSpan(text: 'iOS', style: TextStyle(fontSize: 48, fontWeight: FontWeight.w700, color: Color(0xff6f9bff))),
                        const TextSpan(text: ' and '),
                        const TextSpan(text: 'Android.', style: TextStyle(fontSize: 48, fontWeight: FontWeight.w700, color: Color(0xffc5f36b))),
                      ],
                    ),
                  ),
                  const SizedBox(height: 18),
                  const Text(
                    'SwiftUI, Kotlin/Compose, Flutter — animations, offline-first, and scalable architectures.',
                    style: TextStyle(color: Color(0xffb5bdd9), fontSize: 17, height: 1.6),
                  ),
                  const SizedBox(height: 14),
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: const [
                      _Pill('Swift · SwiftUI'),
                      _Pill('Kotlin · Compose'),
                      _Pill('Flutter · Dart'),
                      _Pill('Animations'),
                      _Pill('API Integration'),
                    ],
                  ),
                  const SizedBox(height: 18),
                  Row(
                    children: [
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const LinearGradient(colors: [Color(0xff6f9bff), Color(0xffc5f36b)]).createShader(const Rect.fromLTWH(0, 0, 200, 50)),
                        ),
                        onPressed: () {},
                        child: const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                          child: Text('View Projects', style: TextStyle(fontWeight: FontWeight.w700)),
                        ),
                      ),
                      const SizedBox(width: 12),
                      OutlinedButton(
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: Colors.white30),
                          foregroundColor: Colors.white,
                        ),
                        onPressed: () {},
                        child: const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                          child: Text('Download CV', style: TextStyle(fontWeight: FontWeight.w700)),
                        ),
                      ),
                    ],
                  ),
                  const Spacer(),
                  const Padding(
                    padding: EdgeInsets.only(bottom: 16),
                    child: Text('Based in Uzbekistan · Available for remote collaborations in 2026', style: TextStyle(color: Color(0xff7d88a6))),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class SaturnPainter extends CustomPainter {
  final List<Offset> stars;
  final double t;
  SaturnPainter({required this.stars, required this.t});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    canvas.drawRect(Offset.zero & size, Paint()..color = const Color(0xff040509));

    // background glow
    final glow = Paint()
      ..shader = RadialGradient(
        colors: [
          const Color(0x226f9bff),
          Colors.transparent,
        ],
      ).createShader(Rect.fromCircle(center: Offset(size.width * 0.2, size.height * 0.2), radius: size.width * 0.9));
    canvas.drawRect(Offset.zero & size, glow);

    // stars
    final starPaint = Paint()..color = Colors.white.withOpacity(0.8);
    for (final s in stars) {
      final pos = Offset(s.dx * size.width, s.dy * size.height);
      canvas.drawCircle(pos, 1.2, starPaint);
    }

    final planetR = size.width * 0.18;
    final planetShader = RadialGradient(
      colors: const [Color(0xff0f1d3a), Color(0xff6f9bff)],
      stops: const [0.15, 1],
    ).createShader(Rect.fromCircle(center: center, radius: planetR * 1.2));
    canvas.drawCircle(center, planetR, Paint()..shader = planetShader);
    canvas.drawCircle(center, planetR * 1.05, Paint()..color = const Color(0x336f9bff)..maskFilter = const MaskFilter.blur(BlurStyle.normal, 12));

    // ring
    canvas.save();
    canvas.translate(center.dx, center.dy);
    canvas.rotate(t * 0.6);
    canvas.scale(1.4, 1);
    final ringPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 14
      ..shader = const LinearGradient(colors: [Color(0xff6f9bff), Color(0xffc5f36b)]).createShader(Rect.fromCenter(center: Offset.zero, width: planetR * 3.2, height: planetR * 1.8))
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 6);
    canvas.drawOval(Rect.fromCenter(center: Offset.zero, width: planetR * 3.2, height: planetR * 1.8), ringPaint);
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant SaturnPainter old) => old.t != t || old.stars != stars;
}

class _Pill extends StatelessWidget {
  final String text;
  const _Pill(this.text);
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: Colors.white24),
        gradient: const LinearGradient(colors: [Color(0x226f9bff), Color(0x22c5f36b)]),
      ),
      child: Text(text, style: const TextStyle(fontWeight: FontWeight.w600)),
    );
  }
}
