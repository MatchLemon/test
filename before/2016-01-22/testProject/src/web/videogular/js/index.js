'use strict';
angular.module('myApp',
		[
			"ngSanitize",
			"com.2fdevs.videogular"
		]
	)
	.controller('HomeCtrl',
		function ($sce) {
			this.config = {
				preload: "none",
				sources: [
					{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
					{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
					{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
				],
				tracks: [
					{
						src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
						kind: "subtitles",
						srclang: "en",
						label: "English",
						default: ""
					}
				],
				theme: {
					url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
				}
			};
		}
	);