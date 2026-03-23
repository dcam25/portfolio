# PropEdge AI – Deep Technical & Product Overview

PropEdge AI is a sports props analytics web application designed to help bettors research player prop markets, build custom models, and uncover AI‑driven edges, with special support for esports markets. [web:10][web:1]

---

## 1. Product Vision

PropEdge AI aims to give serious sports and esports bettors a unified, data‑rich environment to evaluate player props and systematize their betting strategies. [web:10][web:1]

- Provide a single interface for exploring player prop lines and historical performance. [web:10][web:1]  
- Enable custom modeling so users can encode their own theories (e.g., pace, usage, opponent strength). [web:10][web:1]  
- Use AI to surface mispriced lines (“edges”) and make model building more accessible. [web:10][web:1]  

The core philosophy is that bettors should treat prop betting like quantitative research: define hypotheses, build models, backtest, then deploy with discipline. [web:10][web:1]

---

## 2. Core User Workflows

### 2.1 Prop Research

PropEdge AI centers around researching individual player props across sports and esports. [web:10][web:1]

Typical actions for a user:

- Filter by sport, league, date, and player. [web:10]  
- View current and recent prop lines (e.g., kills, points, assists, yards). [web:10][web:1]  
- Inspect historical game logs and distributions relevant to that prop (e.g., last 10 games, season‑long). [web:10]  

The research panel is where the user decides which markets look interesting enough to model, and where to focus energy next. [web:10][web:1]

### 2.2 Custom Model Building

PropEdge AI supports building weighted models, allowing users to assign importance to different features when generating a projection or rating. [web:10][web:1]

Key capabilities:

- Choose input features: recent form, long‑term averages, pace, opponent defense, matchup‑specific factors, etc. (inferred from “sports props analytics” and “custom models”). [web:10][web:1]  
- Assign weights to each feature (e.g., 0.6 to recent games, 0.4 to season average). [web:10]  
- Save and reuse model configurations for different prop types or sports. [web:10][web:1]  

This structure lets two bettors build totally different models based on their intuition while using the same underlying data. [web:10][web:1]

### 2.3 Backtesting

Once a user defines a model, PropEdge AI lets them backtest it against historical data to evaluate its performance. [web:10][web:1]

Backtesting typically includes:

- Applying the model to past games where prop lines and outcomes are known. [web:10]  
- Generating metrics such as strike rate (hit percentage), ROI under various staking assumptions, and performance by line range. [web:10][web:1]  
- Identifying situations where the model is strong (e.g., high‑usage players, specific teams, certain line ranges) and where it fails. [web:10]  

Backtesting gives quantitative feedback, helping users iterate on weights and features instead of guessing. [web:10][web:1]

### 2.4 AI‑Powered Edges

The AI layer is built to do two things:

1. Generate projections or implied distributions for player performance. [web:10][web:1]  
2. Highlight edges where the model/AI projection diverges significantly from posted lines. [web:10][web:1]  

In practice, the user might see:

- A model projection of 26.4 points versus a line of 22.5, with an estimated edge based on implied probabilities. [web:10]  
- Flagged props sorted by projected value, or by difference between AI probability and sportsbook implied probability. [web:10][web:1]  

This allows faster scanning of a large prop board, focusing the user on the most promising opportunities. [web:10][web:1]

---

## 3. Conceptual Architecture

While the repository is described as an “Ultra‑MVP,” the conceptual architecture can be broken into four layers. [web:10][web:1]

### 3.1 Data Layer

Responsibilities:

- Ingest historical and current player stats. [web:10]  
- Ingest prop lines (from one or more data sources). [web:10][web:1]  
- Normalize data (consistent player IDs, team mapping, league structure). [web:10]  

Data structures likely include:

- `players` (player metadata). [web:10]  
- `games` (date, teams, competition, context). [web:10][web:1]  
- `stat_lines` (per‑game stats by player). [web:10]  
- `props` (market lines, odds, and results). [web:10][web:1]  

Esports data introduces additional features: maps, agents/heroes, roles, and objective stats, but they map conceptually to standard player stats. [web:10][web:1]

### 3.2 Modeling & Backtesting Engine

Responsibilities:

- Implement user‑configurable weighted models. [web:10][web:1]  
- Compute projections for each player/prop combination based on chosen features. [web:10]  
- Run backtests across historical data and record model performance. [web:10][web:1]  

Conceptual steps:

1. **Feature extraction** for each game and prop (e.g., usage rate, minutes played, opponent rank). [web:10]  
2. **Weighted aggregation** according to user model settings. [web:10][web:1]  
3. **Projection** of a target metric (e.g., expected points). [web:10]  
4. **Comparison** against historical lines and outcomes for backtesting, and against current lines for edge detection. [web:10][web:1]  

### 3.3 AI Layer

Responsibilities:

- Train or apply pre‑trained models (regression, tree‑based, or neural networks) to produce probability distributions or point estimates. [web:10][web:1]  
- Combine AI outputs with user‑defined weights, or generate default models that newer users can adopt. [web:10]  
- Compute edge metrics such as expected value or probability differences. [web:10][web:1]  

This layer can also be extended to:

- Suggest model configurations for a user based on their past betting behavior. [web:10]  
- Provide natural‑language explanations of why a particular edge exists (e.g., “pace up spot, weak opposing defense, player’s minutes trending up”). [web:10][web:1]  

### 3.4 Web Application Frontend

Responsibilities:

- Provide dashboards for prop research and model management. [web:10][web:1]  
- Offer interactive controls for setting model weights and filters. [web:10]  
- Visualize backtesting results (e.g., graphs of ROI over time, hit rates by league). [web:10][web:1]  

The frontend likely uses a modern SPA framework (React, Vue, or similar) communicating with an API that exposes data, backtesting, and edge results. (Inferred from “web app” and standard practice.) [web:10][web:1]

---

## 4. Esports Focus and Differentiation

A distinctive aspect of PropEdge AI is explicit support for esports props, not just traditional sports. [web:10][web:1]

- Esports props (kills, assists, damage, CS, etc.) have different distributions and pacing than traditional sports stats. [web:10]  
- Data structures must handle series‑based formats (best of 3/5), different map types, and quickly evolving metas. [web:10][web:1]  

This niche focus differentiates PropEdge AI from many mainstream sports analytics tools that ignore or under‑support esports, giving it a potential advantage with bettors in those markets. [web:10][web:1]

---

## 5. Possible Extensions and Roadmap Ideas

Even as an Ultra‑MVP, the design lends itself to several natural extensions. [web:10][web:1]

Potential future enhancements:

- **Multi‑book Integration**: Display lines and edges across multiple sportsbooks to permit price shopping and arbitrage. [web:10]  
- **Portfolio & Risk Tools**: Track open bets, bankroll, and volatility to manage risk systematically. [web:10][web:1]  
- **Signal Sharing**: Allow users to clone or fork public models from other users, with performance transparently displayed. [web:10]  
- **Alerting**: Send alerts when new edges appear that match a user’s filters (sports, leagues, edge thresholds). [web:10][web:1]  

These directions follow directly from the current emphasis on customizable models and AI‑flagged edges. [web:10][web:1]

---

## 6. Positioning vs Other “Prop/PropEdge/Prop AI” Tools

There are multiple products with “Prop AI” or “PropEdge AI” branding in real estate that are unrelated to this sports analytics app. [web:2][web:4][web:5][web:6]

- Real‑estate tools focus on deal analysis, ownership data, and investor workflows. [web:2][web:4][web:5][web:6]  
- PropEdge AI, as described here, is focused on **sports and esports props** and betting analytics. [web:10][web:1]  

This distinction is important when searching for documentation, examples, or community discussions. [web:2][web:4][web:5][web:6][web:10][web:1]

---

## 7. How a Developer Might Use or Extend It

For an engineer working with the PropEdge AI codebase, some practical directions include:

- **Data integration**: Add new leagues, esports titles, or data providers to broaden coverage. [web:10][web:1]  
- **Model sandbox**: Provide a UI section where users can experiment with more advanced model types (e.g., gradient‑boosted trees) while keeping the current weighted model UX. [web:10]  
- **API design**: Expose endpoints for:
  - Fetching props and stats.  
  - Running backtests and retrieving results.  
  - Requesting AI‑computed edges by filters. [web:10][web:1]  
- **Performance optimization**: Cache commonly queried markets, batch backtests, and precompute edges for popular games to keep UX responsive. [web:10]  

These directions align with the project’s description as a sports props analytics web application centered on custom models and AI‑driven insight. [web:10][web:1]
