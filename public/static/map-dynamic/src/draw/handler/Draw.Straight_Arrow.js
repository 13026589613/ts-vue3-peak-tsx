/**
 * @class L.Draw.Straight_arrow
 * @aka Draw.Straight_Arrow
 * @inherits L.Draw.Plot
 */
L.Draw.Straight_Arrow = L.Draw.Plot.extend({
	statics: {
		TYPE: 'straight_arrow'
	},
	
	Poly: L.Straight_Arrow,

	options: {
			showArea: false,
			showLength: false,
			shapeOptions: {
				stroke: true,
				color: '#3388ff',
				weight: 1.5,
				opacity: 1,
				fill: false,
				fillColor: null, //same as color by default
				fillOpacity: 0.2,
				clickable: true
			},
			// Whether to use the metric measurement system (truthy) or not (falsy).
			// Also defines the units to use for the metric system as an array of
			// strings (e.g. `['ha', 'm']`).
			metric: true,
			feet: true, // When not metric, to use feet instead of yards for display.
			nautic: false, // When not metric, not feet use nautic mile for display
			// Defines the precision for each type of unit (e.g. {km: 2, ft: 0}
			precision: {},
			maxPoints: 2 //在画布上点击两下，绘图就结束
		},

	// @method initialize(): void
	initialize: function (map, options) {
		L.Draw.Polygon.prototype.initialize.call(this, map, options);
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Straight_Arrow.TYPE;
		
	},
	
	_drawShape: function (latlng) {
		this._drawShape2p(latlng);
	}
	
});
