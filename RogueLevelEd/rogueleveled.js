var RogueLevelEd = {};

RogueLevelEd.fixRoomXY = true;
RogueLevelEd.copyBuffer = [];
RogueLevelEd.currentMousePos = { x: -1, y: -1 };

RogueLevelEd.constants = {
	"objectColours": {
		"CollHullObj": "#00AA00",
		"BorderObj": "#005000",
		"EnemyOrbObj": "pink",
		"EnemyObj": "pink",
		"ChestObj": "yellow",
		"DoorObj": "brown",
		"ObjContainer": "#000000",
		"PhysicsObj": "#222222",
		"PhysicsObjContainer": "#333333",
		"SpriteObj": "blue",
		"HazardObj": "red",
		"PlayerStartObj": "purple"
	},
	"sprites": {
		"EnemyObj": {"1": "EnemyFlailKnight_Character", "2": "EnemyBlobIdle_Character", "3": "EnemyBouncySpike_Character", "5": "EnemyWizardIdle_Character", "6": "EnemyEyeballIdle_Character", "7": "EnemyFairyGhostIdle_Character", "8": "EnemyGhostIdle_Character", "9": "EnemyWizardIdle_Character", "10": "EnemyHorseRun_Character", "11": "EnemyWizardIdle_Character", "12": "EnemySpearKnightIdle_Character", "13": "EnemyNinjaIdle_Character", "14": "EnemyShieldKnightIdle_Character", "15": "EnemySkeletonIdle_Character", "16": "EnemySwordKnightIdle_Character", "17": "EnemyTurretFire_Character", "19": "EnemyWargIdle_Character", "20": "EnemyZombieRise_Character", "21": "EnemySpikeTrap_Character", "22": "EnemyPlantIdle_Character", "24": "EnemySpark_Character", "25": "EnemySkeletonArcherIdle_Character", "27": "EnemyPlatform_Character", "28": "EnemyHomingTurret_Character", "29": "PlayerIdle_Character", "30": "Dummy_Character", "31": "EnemyStarburstIdle_Character", "32": "EnemyPortrait_Character", "33": "EnemyMimicIdle_Character"},
	},
	"overWriteDefaults": {
		"EnemyObj": {"ScaleX": 3, "ScaleY": 3},

		"ChestObj": {"ScaleX": 2, "ScaleY": 2},
		"SpriteObj": {"ScaleX": 2, "ScaleY": 2},
		"ObjContainer": {"ScaleX": 2, "ScaleY": 2},
		"PhysicsObjContainer": {"ScaleX": 2, "ScaleY": 2},
		"PhysicsObj": {"ScaleX": 2, "ScaleY": 2},
	},

	"attributesInfo": {
		"Name": {type: "string", description: "The name of the object.", default: "unknown"},
		"X": {type: "float", description: "The position of the object (X).", range: {min: -10000, max: 10000}, default: 0},
		"Y": {type: "float", description: "The position of the object (X).", range: {min: -10000, max: 10000}, default: 0},
		"Width": {type: "float", description: "The width of the object.", default: 60},
		"Height": {type: "float", description: "The height of the object.", default: 60},
		"ScaleX": {type: "float", description: "The scale of the object (X).", default: 1},
		"ScaleY": {type: "float", description: "The scale of the object (Y).", default: 1},
		"Rotation": {type: "int", description: "", range: {min: -360, max: 360}, default: 0},
		"Flip": {type: "bool", description: "Flip this object?", default: "False"},
		"Tag": {type: "string", description: "Unknown, seems to be an additional argument? Seems to be used to set delay and speed on EnemyObj of type 17. Some other objects have an int here", default: ""},
		"LevelType": {type: "int", description: "Seems to make the object spawn in only one dungeon type.", range: {min: 0, max: 4}, default: 0},

		"CollidesTop": {type: "bool", description: "Does the object collide on the top?", default: "True"},
		"CollidesRight": {type: "bool", description: "Does the object collide on the right?", default: "True"},
		"CollidesBottom": {type: "bool", description: "Does the object collide on the bottom?", default: "True"},
		"CollidesLeft": {type: "bool", description: "Does the object collide on the left?", default: "True"},

		"OrbType": {type: "int", description: "What type of enemy orb is this?", range:{min:0, max:5}, default: 0},
		"ForceFlying": {type: "bool", description: "Unknown", default: "False"},
		"IsWaypoint": {type: "bool", description: "Unknown", default: "False"},

		"Fairy": {type: "bool", description: "Is this chest a fairy chest?", default: "False"},
		
		"DoorPos": {type: "enum", description: "Unknown, side of object that acts as door?", values:{"Left":"Left", "Right":"Right", "Bottom":"Bottom", "Top":"Top", "None":"None"}, default: "None"},
		"BossDoor": {type: "bool", description: "Is this a boss door?", default: "False"},

		"SpriteName_SpriteObj": {type: "enum", description: "The name of the sprite.", internal: true, values: ["LightSource_Sprite", "CastleAssetWindow2_Sprite", "CastleAssetWindow1_Sprite", "CastleAssetWeb2_Sprite", "CastleAssetWeb1_Sprite", "CastleAssetFrame_Sprite", "DungeonMaiden1_Sprite", "TowerLever1_Sprite", "DungeonSewerGrate2_Sprite", "DungeonPrison1_Sprite", "StartingRoomWater_Sprite", "CastleAssetBookCase3_Sprite", "CastleDoorOpen_Sprite", "GardenBG_Sprite", "StartRoomMountains_Sprite", "StartRoomTree2_Sprite", "StartRoomTree3_Sprite", "StartRoomTree1_Sprite", "StartRoomGrass1_Sprite", "StartRoomGrass2_Sprite", "StartRoomGrass3_Sprite", "StartRoomGrass3Dark_Sprite", "StartRoomGrass1Dark_Sprite", "StartRoomGrass2Dark_Sprite", "StartRoomTree3Dark_Sprite", "StartRoomTree2Dark_Sprite", "StartRoomTree1Dark_Sprite", "ManorSign_Sprite", "StartingRoomFloor_Sprite", "StartingRoomRockTop_Sprite", "StartingRoomFloorEnd_Sprite", "StartingRoomChain_Sprite", "StartingRoomBridge_Sprite", "StartingRoomRockSlope_Sprite", "StartingRoomRockBottom_Sprite", "CastleAssetBookCase2_Sprite", "CastleAssetBookcase_Sprite", "DungeonPrison2_Sprite", "DungeonPrison3_Sprite", "GardenBush2_Sprite", "GardenBush1_Sprite", "GardenFloatingRock1_Sprite", "GardenFloatingRock2_Sprite", "GardenFloatingRock4_Sprite", "GardenFloatingRock3_Sprite", "GardenFloatingRock5_Sprite", "GardenVine2Piece1_Sprite", "TowerHole3_Sprite", "TowerHole2_Sprite", "TowerHole1_Sprite", "TowerHole4_Sprite", "TowerHole6_Sprite", "TowerHole9_Sprite", "TowerHole7_Sprite", "SpecialItemStatue_Sprite", "BonusRoomDiary_Sprite", "TeleporterBase_Sprite", "TowerPedestal1_Sprite", "HealingFountain_Sprite", "CastleMap_Sprite", "CarnivalFlags_Sprite", "CarnivalTent_Sprite", "CarnivalPoster2_Sprite", "CarnivalPoster1_Sprite", "CarnivalPoster3_Sprite", "CastleDoor_Sprite", "StainGlassBorder_Sprite", "StainGlassWindow3_Sprite", "StainGlassWindow2_Sprite", "StainGlassWindow1_Sprite", "StainGlassWindowBricks_Sprite", "Jukebox_Sprite"], default: "LightSource_Sprite"},
		"SpriteName_ObjContainer": {type: "enum", description: "The name of the sprite.", internal: true, values: ["CastleAssetBackTorch_Character", "CastleBGPillar_Character", "CastleAssetSideTorch_Character", "CastleAssetFireplace_Character", "DungeonMaiden3_Character", "DungeonMaiden2_Character", "DungeonMaiden1_Character", "DungeonChain1_Character", "CastleAssetFireplaceNoFire_Character", "DungeonChain2_Character", "LastDoor_Character", "GardenPillar_Character", "GardenFountain_Character", "CarnivalBalloon1_Character", "CarnivalBalloon2_Character", "CarnivalBalloon3_Character", "FountainOfYouth_Character"], default: "CastleAssetBackTorch_Character"},
		"SpriteName_PhysicsObjContainer": {type: "enum", description: "The name of the sprite.", internal: true, values: ["BreakableBarrel1_Character", "BreakableBarrel2_Character", "CastleAssetChandelier1_Character", "CastleAssetCandle1_Character", "CastleAssetKnightStatue_Character", "CastleAssetCandle2_Character", "BreakableChair2_Character", "CastleAssetTable1_Character", "CastleAssetUrn1_Character", "CastleAssetUrn2_Character", "CastleAssetChandelier2_Character", "CastleAssetTable2_Character", "BreakableChair1_Character", "DungeonHangingCell2_Character", "CastleAssetAngelStatue_Character", "CastleAssetDemonStatue_Character", "TowerBust2_Character", "BreakableCrate1_Character", "DungeonHangingCell1_Character", "CastleBGPillar_Character", "GardenLampPost2_Character", "GardenLampPost1_Character", "CherubStatue_Character", "GardenVine2_Character", "GardenVine1_Character"], default: "BreakableBarrel1_Character"},
		"SpriteName_PhysicsObj": {type: "enum", description: "The name of the sprite.", internal: true, values: ["CastleAssetBookcase_Sprite", "CastleAssetBookCase3_Sprite", "CastleAssetBookCase2_Sprite"], default: "CastleAssetBookcase_Sprite"},

		"BGLayer": {type: "bool", description: "Is this sprite part of the background?", default: "False"},

		"Weighted": {type: "bool", description: "Is this object weighted?", default: "False"},
		"Collidable": {type: "bool", description: "Is this object collidable?", default: "False"},
		"Breakable": {type: "bool", description: "Is this object breakable?", default: "False"},

		"EnemyType": {type: "enum", description: "The type of this enemy.", values:{"Ball & Chain": 1, "Blob": 2, "Bouncy Spike": 3, "Earth Wizard": 5, "Eyeball": 6, "Fairy": 7, "Fireball": 8, "Fire Wizard": 9, "Horse": 10, "Ice Wizard": 11, "Knight": 12, "Ninja": 13, "Shield Knight": 14, "Skeleton": 15, "Sword Knight": 16, "Turret": 17, "Wolf": 19, "Zombie": 20, "Spike Trap": 21, "Plant": 22, "Spark": 24, "Skeleton Archer": 25, "Platform": 27, "Homing Turret": 28, "Last Boss": 29, "Dummy": 30, "Starburst": 31, "Portrait": 32, "Mimic": 33}, default: 2},
		"Difficulty": {type: "enum", description: "The difficulty of the enemy.", values:{"BASIC":"BASIC", "EXPERT":"EXPERT", "ADVANCED":"ADVANCED", "MINIBOSS":"MINIBOSS"}, default: "BASIC"},
		"InitialDelay": {type: "float", description: "Seconds before enemy AI kicks in.", default: 0},
	},
	"attributes": {
		"Global": ["Name", "X", "Y", "Width", "Height", "ScaleX", "ScaleY", "Rotation", "Flip", "Tag", "LevelType"],
		"CollHullObj": ["CollidesTop", "CollidesBottom", "CollidesRight", "CollidesLeft"],
		"EnemyOrbObj": ["OrbType", "ForceFlying", "IsWaypoint"],
		"BorderObj": ["CollidesTop", "CollidesBottom", "CollidesRight", "CollidesLeft"],
		"ChestObj": ["Fairy"],
		"DoorObj": ["DoorPos", "BossDoor"],
		"SpriteObj": ["SpriteName_SpriteObj", "BGLayer"],
		"ObjContainer": ["SpriteName_ObjContainer", "BGLayer", "Weighted", "Collidable", "Breakable"],
		"PhysicsObjContainer": ["SpriteName_PhysicsObjContainer", "BGLayer", "Weighted", "Collidable", "Breakable"],
		"EnemyObj": ["EnemyType", "Difficulty", "InitialDelay"],

		"PhysicsObj": ["SpriteName_PhysicsObj", "BGLayer", "Weighted", "Collidable"],
		"HazardObj": [],
		"PlayerStartObj": []
	},
	"attributesRoom": {
		"Name": {type: "string", description: "The name of the room.", default: "unknown"},
		"X": {type: "float", description: "The position of the room (X).", range: {min: -10000, max: 10000}, default: 0},
		"Y": {type: "float", description: "The position of the room (X).", range: {min: -10000, max: 10000}, default: 0},
		"Width": {type: "enum", description: "The width of the room.", default: 1320, values: {"1x":1320, "2x":2640, "3x":3960, "4x":5280, "5x":6600}},
		"Height": {type: "enum", description: "The height of the room.", default: 720, values: {"1x":720, "2x":1440, "3x":2160, "4x":2880, "5x":3600}},
		"ScaleX": {type: "float", description: "The scale of the room (X).", default: 1},
		"ScaleY": {type: "float", description: "The scale of the room (Y).", default: 1},
		"Tag": {type: "string", description: "Unknown", default: ""},

		"SelectionMode": {type: "int", description: "Unknown", default: 0},
		"DisplayBG": {type: "bool", description: "Unknown", default: "False"},

		"CastlePool": {type: "bool", description: "Avaliable in the CASTLE pool?", default: "True"},
		"GardenPool": {type: "bool", description: "Avaliable in the GARDEN pool?", default: "True"},
		"TowerPool": {type: "bool", description: "Avaliable in the TOWER pool?", default: "True"},
		"DungeonPool": {type: "bool", description: "Avaliable in the DUNGEON pool?", default: "True"},
	}
};

RogueLevelEd.initalize = function() {
	RogueLevelEd.bindEvents();
	RogueLevelEd.resetEnvironment();
	RogueLevelEd.showRoomSettings();
};

RogueLevelEd.bindEvents = function() {
	var $contextMenu = $("#contextMenu");
	$(".level").on("contextmenu", function(e) {
		css = {
			display: "block",
			top: "auto",
			left: "auto",
			right: "auto",
			bottom: "auto"
		};
		if(e.pageX > (window.outerWidth / 2))
			css.left = e.pageX - $contextMenu.width();
		else
			css.left = e.pageX;

		if(e.pageY > (window.outerHeight / 2))
			css.top = e.pageY - $contextMenu.height();
		else
			css.top = e.pageY;

		$contextMenu.css(css);
		return false;
	});
	$contextMenu.on("click", "a", function() {
		$contextMenu.hide();
	});

	$('.level').click(function (e) {
		$contextMenu.hide();
	});

	$('.level').mousemove(function(event) {
		var position,
			offsetX = $(event.target).position().left,
			offsetY = $(event.target).position().top;

		if($(event.target).hasClass("level")) {
			$('.dot').show();
			RogueLevelEd.currentMousePos.x = RogueLevelEd.roundToMultiple(event.offsetX, 30);
			RogueLevelEd.currentMousePos.y = RogueLevelEd.roundToMultiple(event.offsetY, 30);
		} else if ($(event.target).parent().hasClass("level")) {
			$('.dot').show();
			RogueLevelEd.currentMousePos.x = RogueLevelEd.roundToMultiple(event.offsetX + offsetX, 30);
			RogueLevelEd.currentMousePos.y = RogueLevelEd.roundToMultiple(event.offsetY + offsetY, 30);
		} else {
			$('.dot').hide();
			return;
		}

		if(RogueLevelEd.currentMousePos.x < 0) RogueLevelEd.currentMousePos.x = 0;
		if(RogueLevelEd.currentMousePos.y < 0) RogueLevelEd.currentMousePos.y = 0;

		$('.dot').css({
			position: "absolute",
			top: RogueLevelEd.currentMousePos.y + "px",
			left: RogueLevelEd.currentMousePos.x + "px"
		});
	});

	$('.save-room-button').click(function(e) {
		e.preventDefault();
		$('.save-room-textarea').val(RogueLevelEd.saveRoom());
		$('#saveModal').modal("show");
	});

	$('.load-room-button').click(function(e) {
		e.preventDefault();
		RogueLevelEd.loadRoom($('.load-room-textarea').val());
		$('#loadModal').modal("hide");
	});

	$('.add-object-button').click(function(e) {
		e.preventDefault();
		RogueLevelEd.createObject($(this).data("type"));
	});

	$('.delete-object-button').click(function(e) {
		e.preventDefault();
		if(RogueLevelEd.environment.selectedObject !== null) {
			RogueLevelEd.deleteObject(RogueLevelEd.environment.selectedObject);
			RogueLevelEd.environment.selectedObject = null;
		}
	});

	$('.room-settings-button').click(function(e) {
		e.preventDefault();
		RogueLevelEd.showRoomSettings();
	});

	keypress.combo("ctrl c", function() {
		console.log("key");
		var copyBuffer = [];

		var bounds = $('.selectedObject').bounds();

		$('.selectedObject').each(function() {
			var obj = jQuery.extend({}, RogueLevelEd.environment.objects[$(this).data("objectid")]);
			delete obj.element;
			obj.X = Math.round(obj.X - bounds.left);
			obj.Y = Math.round(obj.Y - bounds.top);
			copyBuffer.push(obj);
		});

		if(copyBuffer) {
			RogueLevelEd.copyBuffer = copyBuffer;
			RogueLevelEd.statusMessage("Copied!");
		}
	});

	keypress.combo("ctrl v", function(e) {
		for (var o in RogueLevelEd.copyBuffer) {
			o = jQuery.extend({}, RogueLevelEd.copyBuffer[o]);
			o.X += RogueLevelEd.currentMousePos.x;
			o.Y += RogueLevelEd.currentMousePos.y;
			RogueLevelEd.createObjectFromOptions(o);
			RogueLevelEd.statusMessage("Pasted!");
		}
	});

	keypress.combo("delete", function() {
		$('.selectedObject').each(function() {
			var objectId = $(this).data("objectid");
			RogueLevelEd.deleteObject(objectId);
		});
		RogueLevelEd.statusMessage("Deleted!");
	});

	if (screenfull.enabled) {
		$('.distraction-free-button').click(function(e) {
			e.preventDefault();
			screenfull.request();
		});
		document.addEventListener(screenfull.raw.fullscreenchange, function() {
			if(screenfull.isFullscreen) {
				$('.hide-fullscreen').hide();
				$('.levelview').css({
					top: 0,
					left: 0,
					width: "100%"
				});
			} else {
				$('.hide-fullscreen').show();
				$('.levelview').css({
					top: 0,
					left: "20%",
					width: "80%"
				});
			}
		}, true);
	} else {
		$('.distraction-free-button').hide();
	}


	$('.level').click(function(e) {
		e.preventDefault();

		if($(e.target).hasClass("gameObject"))
			return;

		RogueLevelEd.deselectAllObjects();
	});

	keypress.ispressed_pressed = {};
	keypress.ispressed_keydown = function(key) { keypress.ispressed_pressed[key.keyIdentifier] = true; };
	keypress.ispressed_keyup = function(key) { keypress.ispressed_pressed[key.keyIdentifier] = false; };
	keypress.register_ispressed = function(key) {
		keypress.register_combo({
			"keys": key,
			"on_keydown": keypress.ispressed_keydown,
			"on_keyup": keypress.ispressed_keyup
		});
	};

	keypress.isPressed = function(key) {
		if(!keypress.ispressed_pressed[key])
			return false;

		return true;
	};

	keypress.register_ispressed("ctrl");
};

RogueLevelEd.statusMessage = function(message) {
	$('.status').html(message);
	if(RogueLevelEd.__statusTimeout)
		clearTimeout(RogueLevelEd.__statusTimeout);

	RogueLevelEd.__statusTimeout = setTimeout(function() {
		$('.status').html("RogueLevelEd by R4wizard");
	}, 2000);
};

RogueLevelEd.roundToMultiple = function(number, multiple) {
	number -= multiple;
	if(number < 0) multiple = -multiple;
	if(multiple === 0) return number;

	var remainder = number % multiple;
	if(remainder === 0) return number;
	return number + multiple - remainder;
};

RogueLevelEd.resetEnvironment = function() {
	$('.level').html("<div class=\"dot\" style=\"width:30px; height: 30px; border: 1px solid white\"></div>");
	RogueLevelEd.environment = {
		room: {},
		objects: {},
		nextObjectID: 0,
		selectedObject: null
	};

	for(var a in RogueLevelEd.constants.attributesRoom)
		RogueLevelEd.environment.room[a] = RogueLevelEd.constants.attributesRoom[a].default;

	$('.level').width(RogueLevelEd.environment.room.Width);
	$('.level').height(RogueLevelEd.environment.room.Height);
	RogueLevelEd.drawDoorHelpers();
};

RogueLevelEd.saveRoom = function() {
	var objs = jQuery.extend({}, RogueLevelEd.environment.objects);

	var option, object, ele, o;
	var xml = "<" + "?xml version=\"1.0\" encoding=\"utf-8\"?" + ">\r\n<Map>\r\n\t<Spritesheet Name=\"startingRoomSpritesheet\" />\r\n\t<Spritesheet Name=\"castleTerrainSpritesheet\" />\r\n\t<Spritesheet Name=\"dungeonTerrainSpritesheet\" />\r\n\t<Spritesheet Name=\"towerTerrainSpritesheet\" />\r\n\t<Spritesheet Name=\"gardenTerrainSpritesheet\" />\r\n\t<RoomObject";

	for(option in RogueLevelEd.constants.attributesRoom) {
		if(RogueLevelEd.environment.room[option] !== undefined)
			xml += " " + option + "=\"" + RogueLevelEd.environment.room[option].toString().replace("\\", "\\\\").replace("\"", "\\\"") + "\"";
		else
			xml += " " + option + "=\"" + RogueLevelEd.constants.attributesRoom[option].default.toString().replace("\\", "\\\\").replace("\"", "\\\"") + "\"";
	}
	xml += ">\r\n";

	for(object in objs) {
		o = objs[object];
		if(!o) continue;

		var additionals = {};
		switch(o.Type) {
			case "EnemyObj":
				additionals.Procedural = "False";
				additionals.SpriteName = RogueLevelEd.constants.sprites.EnemyObj[o.EnemyType];
				break;
			case "SpriteObj":
				additionals.SpriteName = objs[object].SpriteName_SpriteObj;
				break;
			case "ObjContainer":
				additionals.SpriteName = objs[object].SpriteName_ObjContainer;
				break;
			case "PhysicsObjContainer":
				additionals.SpriteName = objs[object].SpriteName_PhysicsObjContainer;
				break;				
		}

		ele = "\t\t<GameObject Type=\"" + o.Type + "\"";
		for(option in RogueLevelEd.constants.attributes.Global) {
			option = RogueLevelEd.constants.attributes.Global[option];
			if(objs[object][option] !== undefined)
				ele += " " + option + "=\"" + objs[object][option].toString().replace("\\", "\\\\").replace("\"", "\\\"") + "\" ";
			else
				ele += " " + option + "=\"" + RogueLevelEd.constants.attributesInfo[option].default.toString().replace("\\", "\\\\").replace("\"", "\\\"") + "\"";
		}
		for(option in RogueLevelEd.constants.attributes[o.Type]) {
			option = RogueLevelEd.constants.attributes[o.Type][option];
			if(RogueLevelEd.constants.attributesInfo[option].internal === true) continue;

			if(objs[object][option] !== undefined)
				ele += " " + option + "=\"" + objs[object][option].toString().replace("\\", "\\\\").replace("\"", "\\\"") + "\"";
			else
				ele += " " + option + "=\"" + RogueLevelEd.constants.attributesInfo[option].default.toString().replace("\\", "\\\\").replace("\"", "\\\"") + "\"";
		}

		for(option in additionals)
			ele += " " + option + "=\"" + additionals[option].toString().replace("\\", "\\\\").replace("\"", "\\\"") + "\"";

		xml += ele + " />\r\n";
	}

	return xml + "\t</RoomObject>\r\n</Map>";
};

RogueLevelEd.loadRoom = function(xml) {
	xml = $($.parseXML(xml));
	var roomObject = $(xml.find("RoomObject").get(0));
	for(var a in RogueLevelEd.constants.attributesRoom) {
		if(roomObject[0].attributes.hasOwnProperty(a))
			RogueLevelEd.environment.room[a] = roomObject[0].attributes[a].value;
		else
			RogueLevelEd.environment.room[a] = RogueLevelEd.constants.attributesRoom[a].default;
	}

	xml.find("GameObject").each(function() {
		var options = {};
		for(var a in this.attributes)
			if(this.attributes.hasOwnProperty(a))
				options[this.attributes[a].name] = this.attributes[a].value;

		if(RogueLevelEd.fixRoomXY) {
			options.Y = (options.Y - RogueLevelEd.environment.room.Y);
			options.X = (options.X - RogueLevelEd.environment.room.X);
		}
		RogueLevelEd.addObject(options);
	});
	if(RogueLevelEd.fixRoomXY) {
		RogueLevelEd.environment.room.Y = 0;
		RogueLevelEd.environment.room.X = 0;
	}
	RogueLevelEd.showRoomSettings();
	$('.level').width(RogueLevelEd.environment.room.Width);
	$('.level').height(RogueLevelEd.environment.room.Height);
};

RogueLevelEd.addObject = function(options) {
	var element = $("<div class=\"gameObject\">");
	var position;
	$('.level').append(element);
	element.css({
		"top": options.Y + "px",
		"left": options.X + "px",
		"width": options.Width + "px",
		"height": options.Height + "px",
		"backgroundColor": RogueLevelEd.constants.objectColours[options.Type]
	});
	element.html(options.Type);
	element.click(function(e) {
		e.preventDefault();
		if($(this).hasClass('selectedObject') && keypress.isPressed("Control")) {
			RogueLevelEd.deselectObject($(this).data("objectid"));
		} else {
			RogueLevelEd.selectObject($(this).data("objectid"));
		}
	});
	element.data("objectid", RogueLevelEd.environment.nextObjectID);
	element.resizable({
		grid: 30,
		handles: "ne, se, sw, nw",
		stop: function() {
			var objectId = element.data("objectid");
			RogueLevelEd.environment.objects[objectId].Width = Math.round(element.width());
			RogueLevelEd.environment.objects[objectId].Height = Math.round(element.height());
			element.width(RogueLevelEd.environment.objects[objectId].Width);
			element.height(RogueLevelEd.environment.objects[objectId].Height);
			RogueLevelEd.selectObject(objectId);
		}
	}).multiDraggable({
		grid: [30, 30],
		group: function() { return $('.selectedObject'); },
		stopNative: function() {
			var objectId;
			$('.selectedObject').each(function() {
				objectId = $(this).data("objectid");
				RogueLevelEd.environment.objects[objectId].X = Math.round(RogueLevelEd.environment.objects[objectId].element.position().left);
				RogueLevelEd.environment.objects[objectId].Y = Math.round(RogueLevelEd.environment.objects[objectId].element.position().top);
				setTimeout(function() {
					RogueLevelEd.environment.objects[objectId].element.css({
						left: (RogueLevelEd.environment.objects[objectId].X) + "px", 
						top: (RogueLevelEd.environment.objects[objectId].Y) + "px"
					});
				}, 100);
			});
			if(objectId)
				RogueLevelEd.selectObject(objectId);
		}
	});

	switch(options.Type) {
		case "SpriteObj":
			options.SpriteName_SpriteObj = options.SpriteName;
			break;
		case "ObjContainer":
			options.SpriteName_ObjContainer = options.SpriteName;
			break;
		case "PhysicsObjContainer":
			options.SpriteName_PhysicsObjContainer = options.SpriteName;
			break;				
	}

	options.element = element;
	RogueLevelEd.environment.objects[RogueLevelEd.environment.nextObjectID++] = options;
	return element.data("objectid");
};

RogueLevelEd.appendControlToHTML = function(html, object, option, room) {
	var label = "", input = "", desc = "";
	var control;

	if(!room)
		control = RogueLevelEd.constants.attributesInfo[option];
	else
		control = RogueLevelEd.constants.attributesRoom[option];

	switch(control.type) {
		case "string":
			label = "<span class=\"input-group-addon\">" + option + "</span>";
			if(!object[option]) object[option] = control.default;
			input = "<input class=\"form-control\" id=\"" + option + "\" name=\"" + option + "\" value=\"" + object[option] + "\">";
			help = "<span class=\"input-group-addon\"><i class=\"fa fa-question-circle\" title=\"" + control.description + "\"></i></span>";
			html += "<div class=\"input-group\">" + label + input + help + "</div><br />";
			break;
		case "int":
		case "float":
			desc = control.description;
			if(control.range)
				desc += " (min: " + control.range.min + " max: " + control.range.max + ")";

			label = "<span class=\"input-group-addon\">" + option + "</span>";
			if(!object[option]) object[option] = control.default;
			input = "<input class=\"form-control\" id=\"" + option + "\" name=\"" + option + "\" value=\"" + object[option] + "\">";
			help = "<span class=\"input-group-addon\"><i class=\"fa fa-question-circle\" title=\"" + desc + "\"></i></span>";
			html += "<div class=\"input-group\">" + label + input + help + "</div><br />";
			break;
		case "bool":
			label = "<span class=\"input-group-addon\">" + option + "</span>";
			input = "<select class=\"form-control\" id=\"" + option + "\" name=\"" + option + "\">";
			if(!object[option]) object[option] = control.default;
			input += "<option" + (object[option]==="True"?" selected":"") + ">True</option>";
			input += "<option" + (object[option]==="False"?" selected":"") + ">False</option>";
			input += "</select>";
			help = "<span class=\"input-group-addon\"><i class=\"fa fa-question-circle\" title=\"" + control.description + "\"></i></span>";
			html += "<div class=\"input-group\">" + label + input + help + "</div><br />";
			break;
		case "enum": //values
			label = "<span class=\"input-group-addon\">" + option.split("_")[0] + "</span>";
			input = "<select class=\"form-control\" id=\"" + option + "\" name=\"" + option + "\">";
			if(!object[option]) object[option] = control.default;
			for(var val in control.values){
				console.log(object[option], control.values[val]);
				if(jQuery.isArray(control.values))
					input += "<option" + (object[option]==control.values[val]?" selected":"") + " value=\"" + control.values[val] + "\">" + control.values[val] + "</option>";
				else
					input += "<option" + (object[option]==control.values[val]?" selected":"") + " value=\"" + control.values[val] + "\">" + val + "</option>";
			}

			input += "</select>";
			help = "<span class=\"input-group-addon\"><i class=\"fa fa-question-circle\" title=\"" + control.description + "\"></i></span>";
			html += "<div class=\"input-group\">" + label + input + help + "</div><br />";
			break;
	}
	return html;
};

RogueLevelEd.showRoomSettings = function() {
	var html = "", option;
	html += "<form role=\"form\"><div class=\"toolbox-object-global toolbox-object\">";
	for(option in RogueLevelEd.constants.attributesRoom)
		html = RogueLevelEd.appendControlToHTML(html, RogueLevelEd.environment.room, option, true);
	html += "</div></div></form>";
	$('.toolbox').html(html);
	$('.toolbox-object input, .toolbox-object select').on("change keyup keypress", function(e) {
		RogueLevelEd.environment.room[$(this).attr("name")] = $(this).val();
		$('.level').width(RogueLevelEd.environment.room.Width);
		$('.level').height(RogueLevelEd.environment.room.Height);
		RogueLevelEd.drawDoorHelpers();
	});
};

RogueLevelEd.drawDoorHelpers = function() {
	var doorHelper;

	$('.doorHelper').remove();

	for(var x = 540; x < RogueLevelEd.environment.room.Width; x += 1320) {
		doorHelper = $('<div class=\"doorHelper horizontal\"></div>');
		doorHelper.css({left: x, top: 0});
		$('.level').append(doorHelper);
		doorHelper = $('<div class=\"doorHelper horizontal\"></div>');
		doorHelper.css({left: x, bottom: 0});
		$('.level').append(doorHelper);
	}

	for(var y = 240; y < RogueLevelEd.environment.room.Height; y += 720) {
		doorHelper = $('<div class=\"doorHelper vertical\"></div>');
		doorHelper.css({left: 0, top: y});
		$('.level').append(doorHelper);
		doorHelper = $('<div class=\"doorHelper vertical\"></div>');
		doorHelper.css({right: 0, top: y});
		$('.level').append(doorHelper);
	}
};

RogueLevelEd.deselectObject = function(objectId) {
	var object = RogueLevelEd.environment.objects[objectId];
	if(!object) return;

	object.element.removeClass("selectedObject");
	$('.toolbox').html("");
};

RogueLevelEd.deselectAllObjects = function() {
	$('.selectedObject').removeClass("selectedObject");
	RogueLevelEd.showRoomSettings();
};

RogueLevelEd.selectObject = function(objectId) {
	var object = RogueLevelEd.environment.objects[objectId];
	if(!object) return;

	if(!keypress.isPressed("Control"))
		$('.selectedObject').removeClass("selectedObject");

	object.element.addClass('selectedObject');

	RogueLevelEd.environment.selectedObject = objectId;

	var html = "", option;
	html += "<form role=\"form\"><div class=\"toolbox-object-global toolbox-object\"><h3 class=\"btn btn-lg btn-success btn-block\">Global</h3><div class=\"hide\">";
	for(option in RogueLevelEd.constants.attributes.Global) {
		html = RogueLevelEd.appendControlToHTML(html, object, RogueLevelEd.constants.attributes.Global[option]);
	}
	html += "</div></div><hr /><div class=\"toolbox-object-custom toolbox-object\"><h3 class=\"btn btn-lg btn-success btn-block\">" + object.Type + "</h3><div>";
	for(option in RogueLevelEd.constants.attributes[object.Type]) {
		html = RogueLevelEd.appendControlToHTML(html, object, RogueLevelEd.constants.attributes[object.Type][option]);
	}
	html += "</div></div></form>";
	$('.toolbox').html(html);

	$('.toolbox-object input, .toolbox-object select').on("change keyup keypress", function(e) {
		RogueLevelEd.environment.objects[RogueLevelEd.environment.selectedObject][$(this).attr("name")] = $(this).val();
		RogueLevelEd.environment.objects[RogueLevelEd.environment.selectedObject].element.css({
			left: RogueLevelEd.environment.objects[RogueLevelEd.environment.selectedObject].X + "px",
			top: RogueLevelEd.environment.objects[RogueLevelEd.environment.selectedObject].Y + "px"
		});
		RogueLevelEd.environment.objects[RogueLevelEd.environment.selectedObject].element.width(RogueLevelEd.environment.objects[RogueLevelEd.environment.selectedObject].Width);
		RogueLevelEd.environment.objects[RogueLevelEd.environment.selectedObject].element.height(RogueLevelEd.environment.objects[RogueLevelEd.environment.selectedObject].Height);
	});

	$('.toolbox-object h3').click(function(e) {
		e.preventDefault();
		$(this).next("div").toggleClass("hide");
	});
};

RogueLevelEd.createObject = function(type) {
	var object = {}, option;
	object.Type = type;

	for(option in RogueLevelEd.constants.attributes.Global) {
		option = RogueLevelEd.constants.attributes.Global[option];
		object[option] = RogueLevelEd.constants.attributesInfo[option].default;
	}

	for(option in RogueLevelEd.constants.attributes[object.Type]) {
		option = RogueLevelEd.constants.attributes[object.Type][option];
		object[option] = RogueLevelEd.constants.attributesInfo[option].default;
	}

	if(RogueLevelEd.constants.overWriteDefaults[object.Type]) {
		for(option in RogueLevelEd.constants.overWriteDefaults[object.Type]) {
			option = RogueLevelEd.constants.overWriteDefaults[object.Type][option];
			object[option] = RogueLevelEd.constants.overWriteDefaults[object.Type][option];
		}
	}

	object.X = RogueLevelEd.currentMousePos.x;
	object.Y = RogueLevelEd.currentMousePos.y;

	RogueLevelEd.selectObject(RogueLevelEd.addObject(object));
};

RogueLevelEd.createObjectFromOptions = function(options) {
	var object = {}, option;

	for(option in options)
		object[option] = options[option];

	RogueLevelEd.selectObject(RogueLevelEd.addObject(object));
};

RogueLevelEd.deleteObject = function(objectId) {
	RogueLevelEd.environment.objects[objectId].element.remove();
	RogueLevelEd.environment.objects[objectId] = null;
	RogueLevelEd.showRoomSettings();
};
$(RogueLevelEd.initalize);