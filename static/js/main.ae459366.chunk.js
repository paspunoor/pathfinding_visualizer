(this.webpackJsonppf_visualizer=this.webpackJsonppf_visualizer||[]).push([[0],{37:function(e,t,n){e.exports=n.p+"static/media/path.432f50f5.svg"},48:function(e,t,n){e.exports=n(61)},53:function(e,t,n){},54:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),s=n(13),o=n.n(s),r=(n(53),n(54),n(55),n(9)),l=n(45),d=n(22),c=n(23),u=n(8),h=n(30),v=n(29),f=n(35),g=function(e){Object(h.a)(n,e);var t=Object(v.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).state=Object(f.a)({},e),a.handleMouseDown=a.handleMouseDown.bind(Object(u.a)(a)),a.handleMouseEnter=a.handleMouseEnter.bind(Object(u.a)(a)),a.handleMouseLeave=a.handleMouseLeave.bind(Object(u.a)(a)),a}return Object(c.a)(n,[{key:"componentWillReceiveProps",value:function(e){e.isClearingWalls&&this.setState(Object(f.a)({},e))}},{key:"handleMouseDown",value:function(){this.props.isRunning||this.state.isEnd||this.state.isStart||this.setState({isWall:!this.state.isWall})}},{key:"handleMouseEnter",value:function(){this.props.isRunning||this.props.mouseDown&&(this.props.isMovingStart&&!this.state.isEnd?this.setState({isStart:!0,isWall:!1}):this.props.isMovingEnd&&!this.state.isStart?this.setState({isEnd:!0,isWall:!1}):this.handleMouseDown())}},{key:"handleMouseLeave",value:function(){this.props.isRunning||(this.props.isMovingStart&&this.setState({isStart:!1}),this.props.isMovingEnd&&this.setState({isEnd:!1}))}},{key:"render",value:function(){var e=this.state,t=e.row,n=e.col,a=e.isEnd,s=e.isStart,o=e.isWall,r=a?"node-end":s?"node-start":o?"node-wall":"";return i.a.createElement("td",{id:"node-".concat(t,"-").concat(n),className:"node ".concat(r),onMouseDown:this.handleMouseDown,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave})}}]),n}(a.Component),p=n(68),m=n(69),w=n(67),b=n(43);function E(e,t,n){var a=[];e.distance=0;for(var i=function(e){var t,n=[],a=Object(r.a)(e);try{for(a.s();!(t=a.n()).done;){var i,s=t.value,o=Object(r.a)(s);try{for(o.s();!(i=o.n()).done;){var l=i.value;n.push(l)}}catch(d){o.e(d)}finally{o.f()}}}catch(d){a.e(d)}finally{a.f()}return n}(n);i.length;){y(i);var s=i.shift();if(!s.isWall){if(s.distance===1/0)return a;if(s.isVisited=!0,a.push(s),s===t)return a;M(s,n)}}}function y(e){e.sort((function(e,t){return e.distance-t.distance}))}function M(e,t){var n,a=function(e,t){var n=[],a=e.col,i=e.row;i>0&&n.push(t[i-1][a]);i<t.length-1&&n.push(t[i+1][a]);a>0&&n.push(t[i][a-1]);a<t[0].length-1&&n.push(t[i][a+1]);return n.filter((function(e){return!e.isVisited}))}(e,t),i=Object(r.a)(a);try{for(i.s();!(n=i.n()).done;){var s=n.value;s.distance=e.distance+1,s.previousNode=e}}catch(o){i.e(o)}finally{i.f()}}function S(e,t,n){var a=[];e.distance=0;for(var i=function(e){var t,n=[],a=Object(r.a)(e);try{for(a.s();!(t=a.n()).done;){var i,s=t.value,o=Object(r.a)(s);try{for(o.s();!(i=o.n()).done;){var l=i.value;n.push(l)}}catch(d){o.e(d)}finally{o.f()}}}catch(d){a.e(d)}finally{a.f()}return n}(n);i.length;){R(i);var s=i.shift();if(!s.isWall){if(s.distance===1/0)return a;if(s.isVisited=!0,a.push(s),s===t)return a;N(s,n)}}}function R(e){e.sort((function(e,t){return e.distance-t.distance}))}function N(e,t){var n,a=function(e,t){var n=[],a=e.col,i=e.row;i>0&&n.push(t[i-1][a]);i<t.length-1&&n.push(t[i+1][a]);a>0&&n.push(t[i][a-1]);a<t[0].length-1&&n.push(t[i][a+1]);return n.filter((function(e){return!e.isVisited}))}(e,t),i=Object(r.a)(a);try{for(i.s();!(n=i.n()).done;){var s=n.value;s.distance=e.distance+1+s.distanceToFinishNode,s.previousNode=e}}catch(o){i.e(o)}finally{i.f()}}var k=n(37),j=n.n(k),C=function(e){Object(h.a)(n,e);var t=Object(v.a)(n);function n(){var e;return Object(d.a)(this,n),(e=t.call(this)).state={grid:[],mouseDown:!1,startRow:5,startCol:15,endRow:15,endCol:30,algorithm:"1",isRunning:!1,isClearingWalls:!1,isMovingStart:!1,isMovingEnd:!1},e.clearBoard=e.clearBoard.bind(Object(u.a)(e)),e.runPathfinder=e.runPathfinder.bind(Object(u.a)(e)),e.getShortestPath=e.getShortestPath.bind(Object(u.a)(e)),e.toggleIsRunning=e.toggleIsRunning.bind(Object(u.a)(e)),e.clearGrid=e.clearGrid.bind(Object(u.a)(e)),e.handleSelect=e.handleSelect.bind(Object(u.a)(e)),e.getInitialGrid=e.getInitialGrid.bind(Object(u.a)(e)),e.createNode=e.createNode.bind(Object(u.a)(e)),e}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this.getInitialGrid();this.setState({grid:e})}},{key:"toggleIsRunning",value:function(){this.setState({isRunning:!this.state.isRunning})}},{key:"handleSelect",value:function(e){this.setState({algorithm:e})}},{key:"handleMouseDown",value:function(e){if(!this.state.isRunning){this.clearGrid();var t=e.target.id.split("-").slice(1),n=Object(l.a)(t,2),a=n[0],i=n[1];a==this.state.startRow&&i==this.state.startCol&&this.setState({isMovingStart:!0}),a==this.state.endRow&&i==this.state.endCol&&this.setState({isMovingEnd:!0}),this.setState({mouseDown:!0,isClearingWalls:!1})}}},{key:"handleMouseUp",value:function(){if(!this.state.isRunning){this.clearGrid(),this.setState({mouseDown:!1,isClearingWalls:!1,isMovingStart:!1,isMovingEnd:!1});var e=this.state.startRow,t=this.state.startCol,n=this.state.endRow,a=this.state.endCol,i=this.state.grid.slice();for(var s in this.refs){var o=this.refs[s].state,r=o.row,l=o.col,d=o.isStart,c=o.isEnd;i[r][l]=this.refs[s].state,e=d?r:e,t=d?l:t,n=c?r:n,a=c?l:a}this.setState({grid:i,startRow:e,startCol:t,endRow:n,endCol:a})}}},{key:"handleMouseLeave",value:function(){this.state.isRunning||this.state.mouseDown&&this.handleMouseUp()}},{key:"getInitialGrid",value:function(){for(var e=[],t=0;t<20;t++){for(var n=[],a=0;a<50;a++)n.push(this.createNode(t,a));e.push(n)}return e}},{key:"createNode",value:function(e,t){var n=this.state,a=n.startRow,i=n.startCol,s=n.endRow,o=n.endCol,r={row:e,col:t,isStart:e===a&&t===i,isEnd:e===s&&t===o,distance:1/0,isVisited:!1,isWall:!1,previousNode:null,mouseDown:!1,distanceToFinishNode:Math.pow(s-e,2)+Math.pow(o-t,2)};return"undefined"!==typeof a&&(r.isStart=e===a&&t===i,r.isEnd=e===s&&t===o),r}},{key:"clearBoard",value:function(){if(!this.state.isRunning){this.clearGrid();var e=this.state,t=(e.startRow,e.startCol,e.endRow,e.endCol,e.isRunning,this.getInitialGrid());this.setState({isClearingWalls:!0,grid:t})}}},{key:"runPathfinder",value:function(){if(!this.state.isRunning){this.clearGrid(),this.toggleIsRunning();var e,t=this.state,n=t.algorithm,a=t.startRow,i=t.startCol,s=t.endRow,o=t.endCol,r=t.grid,l=r[a][i],d=r[s][o];switch(n){case"1":e=E(l,d,r);break;case"2":e=S(l,d,r);break;case"3":e=function(e,t,n){var a=[],i=[];for(i.push(e);i.length;){var s=i.pop();if(s===t)return a;if(!s.isWall&&(s.isStart||!s.isVisited)){s.isVisited=!0,a.push(s);var o=s.col,r=s.row,l=void 0;r>0&&((l=n[r-1][o]).isVisited||(l.previousNode=s,i.push(l))),r<n.length-1&&((l=n[r+1][o]).isVisited||(l.previousNode=s,i.push(l))),o>0&&((l=n[r][o-1]).isVisited||(l.previousNode=s,i.push(l))),o<n[0].length-1&&((l=n[r][o+1]).isVisited||(l.previousNode=s,i.push(l)))}}}(l,d,r);break;case"4":e=function(e,t,n){for(var a=[],i=[e];i.length;){var s=i.shift();if(s===t)return a;if(!s.isWall&&(s.isStart||!s.isVisited)){s.isVisited=!0,a.push(s);var o=s.col,r=s.row,l=void 0;r>0&&((l=n[r-1][o]).isVisited||(l.previousNode=s,i.push(l))),r<n.length-1&&((l=n[r+1][o]).isVisited||(l.previousNode=s,i.push(l))),o>0&&((l=n[r][o-1]).isVisited||(l.previousNode=s,i.push(l))),o<n[0].length-1&&((l=n[r][o+1]).isVisited||(l.previousNode=s,i.push(l)))}}}(l,d,r)}var c=this.getShortestPath(d);c.push("end"),this.animate(e,c)}}},{key:"getShortestPath",value:function(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}},{key:"animate",value:function(e,t){for(var n=this,a=function(a){if(a===e.length)return setTimeout((function(){n.animateShortestPath(t)}),5*a),{v:void 0};setTimeout((function(){var t=e[a],n=document.getElementById("node-".concat(t.row,"-").concat(t.col)).className;"node node-start"!==n&&"node node-end"!==n&&(document.getElementById("node-".concat(t.row,"-").concat(t.col)).className="node node-visited")}),5*a)},i=0;i<=e.length;i++){var s=a(i);if("object"===typeof s)return s.v}}},{key:"animateShortestPath",value:function(e){for(var t=this,n=function(n){"end"===e[n]?setTimeout((function(){t.toggleIsRunning()}),40*n):setTimeout((function(){var t=e[n],a=document.getElementById("node-".concat(t.row,"-").concat(t.col)).className;"node node-start"!==a&&"node node-end"!==a&&(document.getElementById("node-".concat(t.row,"-").concat(t.col)).className="node node-shortest-path")}),30*n)},a=0;a<e.length;a++)n(a)}},{key:"clearGrid",value:function(){if(!this.state.isRunning){var e,t=this.state,n=(t.startRow,t.startCol,t.endRow,t.endCol,this.state.grid.slice()),a=Object(r.a)(n);try{for(a.s();!(e=a.n()).done;){var i,s=e.value,o=Object(r.a)(s);try{for(o.s();!(i=o.n()).done;){var l=i.value,d=document.getElementById("node-".concat(l.row,"-").concat(l.col)).className;"node node-start"!==d&&"node node-end"!==d&&"node node-wall"!==d&&(document.getElementById("node-".concat(l.row,"-").concat(l.col)).className="node",l.isVisited=!1,l.distance=1/0,l.distanceToFinishNode=Math.pow(this.state.endRow-l.row,2)+Math.pow(this.state.endCol-l.col,2)),"node node-end"===d&&(l.isVisited=!1,l.distance=1/0,l.distanceToFinishNode=0,l.previousNode=null,l.distance=1/0),"node node-start"===d&&(l.isVisited=!1,l.distance=1/0,l.distanceToFinishNode=Math.pow(this.state.endRow-l.row,2)+Math.pow(this.state.endCol-l.col,2),l.isStart=!0,l.isWall=!1,l.previousNode=null,l.isNode=!0)}}catch(c){o.e(c)}finally{o.f()}}}catch(c){a.e(c)}finally{a.f()}}}},{key:"render",value:function(){var e=this,t=this.state,n=t.grid,a=t.mouseDown,s=t.isClearingWalls,o=t.isMovingStart,r=t.isMovingEnd,l=t.isRunning,d={1:"Dijkstra's",2:"A-star",3:"Depth-first search",4:"Breadth-first search"}[t.algorithm];return i.a.createElement("div",{onMouseUp:function(t){t.preventDefault(),e.handleMouseUp()},onMouseDown:function(t){t.preventDefault(),e.handleMouseDown(t)},onMouseLeave:function(t){t.preventDefault(),e.handleMouseLeave()}},i.a.createElement(p.a,{bg:"dark",variant:"dark",expand:"lg"},i.a.createElement(p.a.Brand,null,i.a.createElement("img",{alt:"",src:j.a,width:"30",height:"30",className:"d-inline-block align-top"})," ","Pathfinding algorithm visualizer"),i.a.createElement(p.a.Toggle,{"aria-controls":"basic-navbar-nav"}),i.a.createElement(p.a.Collapse,{id:"basic-navbar-nav"},i.a.createElement(m.a,{className:"mr-auto"},i.a.createElement(w.a,{variant:"Info",title:"Algorithm",id:"basic-nav-dropdown",onSelect:function(t){e.handleSelect(t)}},i.a.createElement(w.a.Item,{eventKey:"1"},"Dijkstra's"),i.a.createElement(w.a.Item,{eventKey:"2"},"A*"),i.a.createElement(w.a.Item,{eventKey:"3"},"Depth-first search"),i.a.createElement(w.a.Item,{eventKey:"4"},"Breadth-first search")),i.a.createElement(b.a,{variant:"info",onClick:this.runPathfinder},"Run -> ",d),i.a.createElement(b.a,{onClick:this.clearBoard,variant:"outline-danger"},"Clear walls and board"),i.a.createElement(b.a,{onClick:this.clearGrid,variant:"outline-warning"},"Clear board")))),i.a.createElement("table",{className:"grid"},i.a.createElement("tbody",null,n.map((function(e,t){return i.a.createElement("tr",{key:t},e.map((function(e,t){var n=e.row,d=e.col,c=e.isEnd,u=e.isStart,h=e.isWall,v=e.isVisited,f=e.distance,p=e.previousNode;return i.a.createElement(g,{key:t,row:n,col:d,isEnd:c,isStart:u,isWall:h,isVisited:v,mouseDown:a,distance:f,previousNode:p,ref:n+":"+d,isClearingWalls:s,isMovingStart:o,isMovingEnd:r,isRunning:l})})))})))))}}]),n}(a.Component);var O=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(C,null))};o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(O,null)),document.getElementById("root"))}},[[48,1,2]]]);
//# sourceMappingURL=main.ae459366.chunk.js.map