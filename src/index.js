import dva from 'dva';
import './utils/flexible';
import globalModel from './models/global';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/leftPage').default);
app.model(require('./models/centerPage').default);
app.model(require('./models/rightPage').default);
app.model(globalModel);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
