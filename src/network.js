import ForceGraph3D from "3d-force-graph";
import * as THREE from "three";
import Experience from "./Experience/Experience.js";

const experience = new Experience();
var scene = experience.scene;

const _yBillboardWorldPos = new THREE.Vector3();
const _yBillboardTarget = new THREE.Vector3();
function yBillboardOnBeforeRender(_renderer, _scene, camera) {
  this.getWorldPosition(_yBillboardWorldPos);
  _yBillboardTarget.set(
    camera.position.x,
    _yBillboardWorldPos.y,
    camera.position.z
  );
  this.lookAt(_yBillboardTarget);
}

// Global references for Experience integration
window.networkGroup = null;

// Debug function to find node positions
window.findNodePosition = function (searchId) {
  if (state.webglGraph) {
    const graphData = state.webglGraph.graphData();
    if (graphData && graphData.nodes) {
      const node = graphData.nodes.find((n) => n.id === searchId);
      if (node) {
        console.log(`Found node ${searchId}:`, {
          x: Math.round(node.x * 1000) / 1000,
          y: Math.round(node.y * 1000) / 1000,
          z: Math.round(node.z * 1000) / 1000,
        });
        return node;
      } else {
        console.log(`Node ${searchId} not found`);
      }
    }
  }
};

window.listAllNodes = function () {
  if (state.webglGraph) {
    const graphData = state.webglGraph.graphData();
    if (graphData && graphData.nodes) {
      console.log("Available nodes:", graphData.nodes.map((n) => n.id).sort());
    }
  }
};

window.updateNetworkVisualization = function () {
  if (state.webglGraph && typeof state.webglGraph.tickFrame === "function") {
    state.webglGraph.tickFrame();
  }
};

const state = {
  threeObjects: {
    // Manual tracking and release of resources used by Three.js
    // https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects
    geometries: {},
    materials: {},
    textures: {},
    renderers: {},
    renderTargets: {},
    trackGeometry(id, geometry) {
      if (typeof this.geometries[id] !== "undefined") {
        this.removeGeometry(id);
      }
      this.geometries[id] = geometry;
    },
    removeGeometry(id) {
      this.geometries[id].dispose();
      delete this.geometries[id];
    },
    trackMaterial(id, material) {
      if (typeof this.materials[id] !== "undefined") {
        this.removeMaterial(id);
      }
      this.materials[id] = material;
    },
    removeMaterial(id) {
      this.materials[id].dispose();
      delete this.materials[id];
    },
    trackTexture(id, texture) {
      if (typeof this.textures[id] !== "undefined") {
        this.removeTexture(id);
      }
      this.textures[id] = texture;
    },
    removeTexture(id) {
      this.textures[id].dispose();
      delete this.textures[id];
    },
    trackRenderer(id, renderer) {
      if (typeof this.renderers[id] !== "undefined") {
        this.removeRenderer(id);
      }
      this.renderers[id] = renderer;
    },
    removeRenderer(id) {
      this.renderers[id].dispose();
      delete this.renderers[id];
    },
    trackRenderTarget(id, renderTarget) {
      if (typeof this.renderTargets[id] !== "undefined") {
        this.removeRenderTarget(id);
      }
      this.renderTargets[id] = renderTarget;
    },
    removeRenderTarget(id) {
      if (this.renderTargets[id] !== null) {
        this.renderTargets[id].dispose();
      }
      delete this.renderTargets[id];
    },
    disposeAll() {
      const objects = [
        this.geometries,
        this.materials,
        this.textures,
        this.renderers,
        this.renderTargets,
      ];
      for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] !== null) {
              obj[key].dispose();
            }
          }
        }
      }
    },
  },
  manager: {
    // Data generation process: 1) Fetch state.rawData, 2) derive state.parsedData, 3) derive state.shownData

    // 1) Fetch state.rawData
    fetchRawDataFromTemplating() {
      state.rawData = [
  {
    "nodes": {
      "LargeGeospatialModels": {
        "metadata": {
          "id": "LargeGeospatialModels",
          "name": "Large Geospatial Models",
          "year": 2025,
          "currentStatus": "Development",
          "type": "GenerativeAI",
          "MLTask": "Generate",
          "militaryUse": "Intelligence",
          "civicUse": "AR, Games",
          "MLTasks": "imageGeneration, Photogrammetry, TransformerModel",
          "purpose": "PredictiveMapping",
          "capacity": "ImageGeneration",
          "vair:technique": "DeepLearning",
          "output": "Content",
          "vair:riskSources": "InaccuratePrediction, BiasedTrainingData,",
          "impact": "PhysicalInjury, Overreliance, DistortionInHumanBehavior",
          "hover": "name: Large Geospatial Models; year: 2025; task: GenerativeAI; AI type: Generate; Military use: Intelligence; Civic use: AR, Games",
          "image": "./assets/noun-photogrammetry-4284363.png",
          "nounKey": "terrainMapping",
          "color": "#5186DB"
        }
      },
      "PolygraphPlus": {
        "metadata": {
          "id": "PolygraphPlus",
          "name": "Polygraph+",
          "year": 2024,
          "currentStatus": "Development",
          "type": "BehaviorModeling, AnomalyDetection, ComputerVision, VoiceRecognition, IoT",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "BehaviorEvaluation",
          "MLTasks": "SignalAnalysis",
          "purpose": "DetectingLies, DetectingCriminalOffences, AssessingRiskOfOffending, AssessingPeopleRelatedRisk, EvaluatingEmployeePerformance, EvaluatingJobCandidates, ProducingRecommendation",
          "capacity": "LieDetection, BehaviourAnalysis, BiometricsBasedEmotionRecognition, BiometricCategorisation, EmotionRecognition, GestureRecognition, Profiling,",
          "vair:technique": "SemiUnsupervisedLearning, StatisticalTechnique",
          "output": "Decision",
          "impact": "WellbeingImpact, PsychologicalHarm",
          "hover": "name: Polygraph+; year: 2024; task: BehaviorModeling, AnomalyDetection, ComputerVision, VoiceRecognition, IoT; AI type: Recognize; Military use: Intelligence; Civic use: BehaviorEvaluation",
          "image": "./assets/noun-neurofeedback-7447387.png",
          "nounKey": "neurofeedback",
          "color": "#5186DB"
        }
      },
      "Lavender": {
        "metadata": {
          "id": "Lavender",
          "name": "Lavender",
          "year": 2023,
          "currentStatus": "Operation",
          "type": "RecommendationSystem, PredictiveAnalytics, BehaviorModeling",
          "MLTask": "Predict",
          "militaryUse": "Intelligence",
          "civicUse": "RecommenderSystem",
          "MLTasks": "Ranking, Recommendation",
          "purpose": "ProducingRecommendation",
          "capacity": "Profiling, InformationRetrieval, NamedEntityRecognition, RelationshipExtraction, SensitiveAttributeInference, SentimentAnalysis",
          "vair:technique": "LanguageModels",
          "output": "Recommendation",
          "vair:riskSources": "InaccurateRecommendation, BiasedTrainingData, ErrorInDataCollection, ErrorInDataPreparation, WrongDataDesignChoice, LowAccuracy",
          "impact": "PhysicalInjury, WellbeingImpact, PsychologicalHarm",
          "hover": "name: Lavender; year: 2023; task: RecommendationSystem, PredictiveAnalytics, BehaviorModeling; AI type: Predict; Military use: Intelligence; Civic use: RecommenderSystem",
          "image": "./assets/noun-target-7619584.png",
          "nounKey": "ml",
          "color": "#51DBD9"
        }
      },
      "WheresDaddy": {
        "metadata": {
          "id": "WheresDaddy",
          "name": "Where's Daddy",
          "year": 2023,
          "currentStatus": "Operation",
          "type": "LocationAwareness",
          "MLTask": "Predict",
          "militaryUse": "Command",
          "civicUse": "Logistics, Delivery, Advertising",
          "MLTasks": "PatternRecognition, DataSynthesis, SignalAnalysis, TextAnalysis,",
          "purpose": "ProducingRecommendation, DetectingIndividuals",
          "capacity": "Geolocation, ComputerVision, ObjectRecognition, SignalTracking",
          "output": "Prediction",
          "vair:riskSources": "InaccurateRecommendation, BiasedTrainingData, ErrorInDataCollection, ErrorInDataPreparation, WrongDataDesignChoice, LowAccuracy",
          "impact": "PhysicalInjury, WellbeingImpact, PsychologicalHarm",
          "hover": "name: Where's Daddy; year: 2023; task: LocationAwareness; AI type: Predict; Military use: Command; Civic use: Logistics, Delivery, Advertising",
          "image": "./assets/noun-infrared-drone-4284335.png",
          "nounKey": "locationTracking",
          "color": "#51DBD9"
        }
      },
      "LegionX": {
        "metadata": {
          "id": "LegionX",
          "name": "LegionX",
          "year": 2022,
          "currentStatus": "Operation",
          "type": "Robotics/Navigation, MultiAgentSystem",
          "MLTask": "Automate",
          "militaryUse": "Operations, Intelligence",
          "civicUse": "Policing, CrowdControl, PrivateSecurity, BehaviorEvaluation",
          "MLTasks": "PatternRecognition, ObjectRecognition, PoseEstimation",
          "purpose": "ProducingRecommendation, DetectingIndividuals",
          "capacity": "ObjectDetection, PoseEstimation, Geolocation",
          "output": "Action, Decision",
          "impact": "PhysicalInjury, Overreliance, DistortionInHumanBehavior",
          "hover": "name: LegionX; year: 2022; task: Robotics/Navigation, MultiAgentSystem; AI type: Automate; Military use: Operations, Intelligence; Civic use: Policing, CrowdControl, PrivateSecurity, BehaviorEvaluation",
          "image": "./assets/noun-drone-strike-75130.png",
          "nounKey": "poseRecognition",
          "color": "#51DBD9"
        }
      },
      "WolfPack": {
        "metadata": {
          "id": "WolfPack",
          "name": "Wolf Pack",
          "year": 2018,
          "currentStatus": "Operation",
          "type": "DataManagement",
          "MLTask": "Store",
          "militaryUse": "Logistics",
          "civicUse": "ConsumerTracking, Marketing, Security, SocialWelfareSystems",
          "purpose": "Monitoring, PerformingBackgroundChecks, RecognizingIndividuals",
          "impact": "PhysicalInjury, WellbeingImpact, PsychologicalHarm, Overreliance, DistortionInHumanBehavior",
          "hover": "name: Wolf Pack; year: 2018; task: DataManagement; AI type: Store; Military use: Logistics; Civic use: ConsumerTracking, Marketing, Security, SocialWelfareSystems",
          "image": "./assets/noun-ai-training-data-2985134.png",
          "nounKey": "trainingData",
          "color": "#51DBD9"
        }
      },
      "AIP": {
        "metadata": {
          "id": "AIP",
          "name": "Artificial Intelligence Platform",
          "year": 2022,
          "currentStatus": "Operation",
          "type": "NLP, GenerativeAI",
          "MLTask": "Generate",
          "militaryUse": "Command",
          "civicUse": "Dashboard, ProjectManagement",
          "output": "Action, Content, Decision, Prediction, Recommendation",
          "hover": "name: Artificial Intelligence Platform; year: 2022; task: NLP, GenerativeAI; AI type: Generate; Military use: Command; Civic use: Dashboard, ProjectManagement",
          "image": "./assets/noun-surveillance-monitor-6831349.png",
          "color": "#51B2DB"
        }
      },
      "MetaConstellation": {
        "metadata": {
          "id": "MetaConstellation",
          "name": "Meta Constellation",
          "year": 2022,
          "currentStatus": "Operation",
          "type": "PlanningSystem, MultiAgentSystem, RecommenderSystem",
          "MLTask": "Assign",
          "militaryUse": "Intelligence",
          "civicUse": "Dashboard, SupplyChainManagement",
          "hover": "name: Meta Constellation; year: 2022; task: PlanningSystem, MultiAgentSystem, RecommenderSystem; AI type: Assign; Military use: Intelligence; Civic use: Dashboard, SupplyChainManagement",
          "image": "./assets/noun-remote-team-6432341.png",
          "nounKey": "locationTracking",
          "color": "#51B2DB"
        }
      },
      "Clearview": {
        "metadata": {
          "id": "Clearview",
          "name": "Clearview",
          "year": 2022,
          "currentStatus": "Operation",
          "type": "FacialRecognition; ComputerVision",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "IdentityVerification, AppUnlocking, AccessGranting",
          "purpose": "IdentifyingIndividuals, RecognizingIndividuals, RemoteIdentification",
          "capacity": "FaceRecognition",
          "hover": "name: Clearview; year: 2022; task: FacialRecognition; ComputerVision; AI type: Recognize; Military use: Intelligence; Civic use: IdentityVerification, AppUnlocking, AccessGranting",
          "image": "./assets/noun-facial-recognition-4116350.png",
          "nounKey": "faceRecognition",
          "color": "#51B2DB"
        }
      },
      "Wolly": {
        "metadata": {
          "id": "Wolly",
          "name": "Wolly",
          "year": 2022,
          "currentStatus": "Operation",
          "type": "Robotics/Navigation, ComputerVision, RecommenderSystem",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Policing, CrowdControl, PrivateSecurity",
          "hover": "name: Wolly; year: 2022; task: Robotics/Navigation, ComputerVision, RecommenderSystem; AI type: Automate; Military use: Operations; Civic use: Policing, CrowdControl, PrivateSecurity",
          "image": "./assets/noun-turret-6749967.png",
          "nounKey": "robotPolicing",
          "color": "#51B2DB"
        }
      },
      "FirstPOVDrones": {
        "metadata": {
          "id": "FirstPOVDrones",
          "name": "First  Person View Drones",
          "year": 2022,
          "currentStatus": "Operation",
          "type": "Robotics/Navigation",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Policing, Surveillance",
          "hover": "name: First  Person View Drones; year: 2022; task: Robotics/Navigation; AI type: Automate; Military use: Operations; Civic use: Policing, Surveillance",
          "image": "./assets/noun-drone-strike-75130.png",
          "nounKey": "uav",
          "color": "#51B2DB"
        }
      },
      "MAPLE": {
        "metadata": {
          "id": "MAPLE",
          "name": "MAPLE",
          "year": 2022,
          "currentStatus": "Operation",
          "type": "IntelligentControlSystem, Simulation",
          "MLTask": "Assign",
          "militaryUse": "Command",
          "civicUse": "Logistics, Delivery, SupplyChainManagement",
          "hover": "name: MAPLE; year: 2022; task: IntelligentControlSystem, Simulation; AI type: Assign; Military use: Command; Civic use: Logistics, Delivery, SupplyChainManagement",
          "image": "./assets/noun-surveillance-monitor-6831349.png",
          "color": "#51DBAB"
        }
      },
      "Gospel": {
        "metadata": {
          "id": "Gospel",
          "name": "The Gospel",
          "year": 2021,
          "currentStatus": "Operation",
          "type": "ExpertSystem, Classification",
          "MLTask": "Sort",
          "militaryUse": "Command",
          "civicUse": "ConsumerTracking, Security, SocialWelfareSystems",
          "MLTasks": "Automate",
          "hover": "name: The Gospel; year: 2021; task: ExpertSystem, Classification; AI type: Sort; Military use: Command; Civic use: ConsumerTracking, Security, SocialWelfareSystems",
          "image": "./assets/noun-earthquake-damage-6326583.png",
          "color": "#51DBD9"
        }
      },
      "Alchemist": {
        "metadata": {
          "id": "Alchemist",
          "name": "Alchemist",
          "year": 2021,
          "currentStatus": "Operation",
          "type": "LocationAwareness, AnomalyDetection",
          "MLTask": "Recognize",
          "militaryUse": "Operations, Intelligence",
          "civicUse": "Policing, Security, BorderPatrol",
          "vair:technique": "realTime",
          "hover": "name: Alchemist; year: 2021; task: LocationAwareness, AnomalyDetection; AI type: Recognize; Military use: Operations, Intelligence; Civic use: Policing, Security, BorderPatrol",
          "image": "./assets/noun-mobile-tracking-5477710.png",
          "color": "#51DBD9"
        }
      },
      "Nimbus": {
        "metadata": {
          "id": "Nimbus",
          "name": "Project Nimbus",
          "year": 2021,
          "currentStatus": "Operation",
          "type": "DataManagement",
          "MLTask": "Store",
          "militaryUse": "Logistics",
          "civicUse": "CloudComputing",
          "hover": "name: Project Nimbus; year: 2021; task: DataManagement; AI type: Store; Military use: Logistics; Civic use: CloudComputing",
          "image": "./assets/noun-data-center-2301592.png",
          "color": "#51DBD9"
        }
      },
      "ARCA": {
        "metadata": {
          "id": "ARCA",
          "name": "Assault Rifle Combat Application System",
          "year": 2021,
          "currentStatus": "Operation",
          "type": "Robotics/Navigation, ComputerVision, BehaviorModeling",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Policing, CrowdControl, PrivateSecurity",
          "hover": "name: Assault Rifle Combat Application System; year: 2021; task: Robotics/Navigation, ComputerVision, BehaviorModeling; AI type: Automate; Military use: Operations; Civic use: Policing, CrowdControl, PrivateSecurity",
          "image": "./assets/noun-target-7619584.png",
          "color": "#51DBD9"
        }
      },
      "LAW": {
        "metadata": {
          "id": "LAW",
          "name": "Lethal Autonomous Weapons",
          "year": 2021,
          "currentStatus": "Operation",
          "type": "Robotics/Navigation,  IntelligentControlSystem",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Policing, CrowdControl, PrivateSecurity",
          "hover": "name: Lethal Autonomous Weapons; year: 2021; task: Robotics/Navigation,  IntelligentControlSystem; AI type: Automate; Military use: Operations; Civic use: Policing, CrowdControl, PrivateSecurity",
          "image": "./assets/noun-infrared-drone-4284335.png",
          "color": "#5186DB"
        }
      },
      "Gotham": {
        "metadata": {
          "id": "Gotham",
          "name": "Gotham",
          "year": 2021,
          "currentStatus": "Operation",
          "type": "DataManagement, AnomalyDetection, BehaviorModeling",
          "MLTask": "Recognize",
          "militaryUse": "Command, Logistics, Operations",
          "civicUse": "Dashboard, ProjectManagement",
          "hover": "name: Gotham; year: 2021; task: DataManagement, AnomalyDetection, BehaviorModeling; AI type: Recognize; Military use: Command, Logistics, Operations; Civic use: Dashboard, ProjectManagement",
          "image": "./assets/noun-missile-launcher-2052140.png",
          "color": "#51B2DB"
        }
      },
      "JEDI": {
        "metadata": {
          "id": "JEDI",
          "name": "JEDI",
          "year": 2021,
          "currentStatus": "Operation",
          "type": "DataManagement",
          "MLTask": "Store",
          "militaryUse": "Logistics",
          "civicUse": "CloudComputing, EdgeComputing",
          "hover": "name: JEDI; year: 2021; task: DataManagement; AI type: Store; Military use: Logistics; Civic use: CloudComputing, EdgeComputing",
          "image": "./assets/noun-locked-cloud-5565062.png",
          "color": "#5186DB"
        }
      },
      "FireWeaver": {
        "metadata": {
          "id": "FireWeaver",
          "name": "Fire Weaver",
          "year": 2020,
          "currentStatus": "Operation",
          "type": "MultiAgentSystem, PlanningSystem, RecommenderSystem",
          "MLTask": "Assign",
          "militaryUse": "Command",
          "civicUse": "Unknown",
          "output": "Action",
          "hover": "name: Fire Weaver; year: 2020; task: MultiAgentSystem, PlanningSystem, RecommenderSystem; AI type: Assign; Military use: Command; Civic use: Unknown",
          "image": "./assets/noun-virtual-headset-7137401.png",
          "color": "#51DBD9"
        }
      },
      "FireFactory": {
        "metadata": {
          "id": "FireFactory",
          "name": "Fire Factory",
          "year": 2020,
          "currentStatus": "Operation",
          "type": "Robotics/Navigation, IntelligentControlSystem",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Unknown",
          "MLTasks": "Prediction",
          "hover": "name: Fire Factory; year: 2020; task: Robotics/Navigation, IntelligentControlSystem; AI type: Automate; Military use: Operations; Civic use: Unknown",
          "image": "./assets/noun-missile-launcher-2052140.png",
          "color": "#51DBD9"
        }
      },
      "DIAS": {
        "metadata": {
          "id": "DIAS",
          "name": "Dialect Recognition Assistant (DIAS)",
          "year": 2019,
          "currentStatus": "Operation",
          "type": "NLP",
          "MLTask": "Sort",
          "militaryUse": "Intelligence",
          "civicUse": "IdentityVerification",
          "capacity": "AudioProcessing, DialectRecognition",
          "hover": "name: Dialect Recognition Assistant (DIAS); year: 2019; task: NLP; AI type: Sort; Military use: Intelligence; Civic use: IdentityVerification",
          "image": "./assets/noun-speech-recognition-1870316.png",
          "color": "#51DBAB"
        }
      },
      "AFRS": {
        "metadata": {
          "id": "AFRS",
          "name": "Automated Facial Recognition System",
          "year": 2019,
          "currentStatus": "Operation",
          "type": "FacialRecognition; ComputerVision",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "IdentityVerification, AppUnlocking, AccessGranting",
          "capacity": "FaceRecognition",
          "hover": "name: Automated Facial Recognition System; year: 2019; task: FacialRecognition; ComputerVision; AI type: Recognize; Military use: Intelligence; Civic use: IdentityVerification, AppUnlocking, AccessGranting",
          "image": "./assets/noun-facial-recognition-4116350.png",
          "color": "#51B2DB"
        }
      },
      "Starshield": {
        "metadata": {
          "id": "Starshield",
          "name": "Starshield",
          "year": 2024,
          "currentStatus": "Operation",
          "type": "IoT, LocationAwareness",
          "MLTask": "Capture",
          "militaryUse": "Intelligence",
          "civicUse": "InternetAccess, DataDistribution, SecureTransmission",
          "hover": "name: Starshield; year: 2024; task: IoT, LocationAwareness; AI type: Capture; Military use: Intelligence; Civic use: InternetAccess, DataDistribution, SecureTransmission",
          "image": "./assets/noun-satelite-5565092.png",
          "color": "#5186DB"
        }
      },
      "Starlink": {
        "metadata": {
          "id": "Starlink",
          "name": "Starlink",
          "year": 2019,
          "currentStatus": "Operation",
          "type": "IoT, LocationAwareness",
          "MLTask": "Capture",
          "militaryUse": "Intelligence",
          "civicUse": "InternetAccess, DataDistribution",
          "hover": "name: Starlink; year: 2019; task: IoT, LocationAwareness; AI type: Capture; Military use: Intelligence; Civic use: InternetAccess, DataDistribution",
          "image": "./assets/noun-satelite-5565092.png",
          "color": "#5186DB"
        }
      },
      "Pantir-SM": {
        "metadata": {
          "id": "Pantir-SM",
          "name": "Pantir-SM",
          "year": 2019,
          "currentStatus": "Operation",
          "type": "Robotics/Navigation, IntelligentControlSystem, Classification",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Policing, CrowdControl, PrivateSecurity",
          "MLTasks": "Classification",
          "vair:technique": "Classification",
          "hover": "name: Pantir-SM; year: 2019; task: Robotics/Navigation, IntelligentControlSystem, Classification; AI type: Automate; Military use: Operations; Civic use: Policing, CrowdControl, PrivateSecurity",
          "image": "./assets/noun-classification-6860055.png",
          "color": "#5186DB"
        }
      },
      "RedWolf": {
        "metadata": {
          "id": "RedWolf",
          "name": "Red Wolf",
          "year": 2019,
          "currentStatus": "Operation",
          "type": "FacialRecognition, ComputerVision",
          "MLTask": "Recognize",
          "militaryUse": "Operations",
          "civicUse": "IdentityVerification, Security, Policing",
          "MLTasks": "Classification",
          "capacity": "FaceRecognition",
          "vair:technique": "FaceRecognition",
          "hover": "name: Red Wolf; year: 2019; task: FacialRecognition, ComputerVision; AI type: Recognize; Military use: Operations; Civic use: IdentityVerification, Security, Policing",
          "image": "./assets/noun-facial-recognition-4116350.png",
          "color": "#51DBD9"
        }
      },
      "BlueWolf": {
        "metadata": {
          "id": "BlueWolf",
          "name": "BlueWolf",
          "year": 2018,
          "currentStatus": "Operation",
          "type": "FacialRecognition, ComputerVision",
          "MLTask": "Recognize",
          "militaryUse": "Operations",
          "civicUse": "IdentityVerification, Security, Policing",
          "MLTasks": "Classification",
          "capacity": "FaceRecognition",
          "vair:technique": "FaceRecognition",
          "hover": "name: BlueWolf; year: 2018; task: FacialRecognition, ComputerVision; AI type: Recognize; Military use: Operations; Civic use: IdentityVerification, Security, Policing",
          "image": "./assets/noun-face-id-scan-1890640.png",
          "color": "#51DBD9"
        }
      },
      "Mabat2000": {
        "metadata": {
          "id": "Mabat2000",
          "name": "Mabat 2000",
          "year": 2018,
          "currentStatus": "Operation",
          "type": "ComputerVision",
          "MLTask": "Capture",
          "militaryUse": "Intelligence",
          "civicUse": "Surveillance, Policing",
          "hover": "name: Mabat 2000; year: 2018; task: ComputerVision; AI type: Capture; Military use: Intelligence; Civic use: Surveillance, Policing",
          "image": "./assets/noun-cctv-5477699.png",
          "color": "#51DBD9"
        }
      },
      "URSA": {
        "metadata": {
          "id": "URSA",
          "name": "URSA",
          "year": 2018,
          "currentStatus": "Retirement",
          "type": "LocationAwareness",
          "MLTask": "Recognize",
          "militaryUse": "Operations",
          "civicUse": "Retired",
          "hover": "name: URSA; year: 2018; task: LocationAwareness; AI type: Recognize; Military use: Operations; Civic use: Retired",
          "image": "./assets/noun-data-science-6432260.png",
          "color": "#5186DB"
        }
      },
      "TacNet": {
        "metadata": {
          "id": "TacNet",
          "name": "TacNet",
          "year": 2017,
          "currentStatus": "Operation",
          "type": "MultiAgentSystem, PlanningSystem, RecommenderSystem",
          "MLTask": "Assign",
          "militaryUse": "Command",
          "civicUse": "Policing, CrowdControl, PrivateSecurity",
          "hover": "name: TacNet; year: 2017; task: MultiAgentSystem, PlanningSystem, RecommenderSystem; AI type: Assign; Military use: Command; Civic use: Policing, CrowdControl, PrivateSecurity",
          "image": "./assets/noun-surveillance-monitor-6831349.png",
          "color": "#51DBAB"
        }
      },
      "Bylina": {
        "metadata": {
          "id": "Bylina",
          "name": "Bylina",
          "year": 2017,
          "currentStatus": "Operation",
          "type": "PredictiveAnalytics",
          "MLTask": "Predict",
          "militaryUse": "Command",
          "civicUse": "Unknown",
          "hover": "name: Bylina; year: 2017; task: PredictiveAnalytics; AI type: Predict; Military use: Command; Civic use: Unknown",
          "image": "./assets/noun-earthquake-damage-6326583.png",
          "color": "#5186DB"
        }
      },
      "Maven": {
        "metadata": {
          "id": "Maven",
          "name": "Maven Smart System",
          "year": 2016,
          "currentStatus": "Operation",
          "type": "ComputerVision",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "Policing, Security, BorderPatrol, ScientificResearch",
          "MLTasks": "ObjectDetection",
          "capacity": "ObjectDetection",
          "vair:technique": "ObjectDetection",
          "hover": "name: Maven Smart System; year: 2016; task: ComputerVision; AI type: Recognize; Military use: Intelligence; Civic use: Policing, Security, BorderPatrol, ScientificResearch",
          "image": "./assets/noun-object-recognition-6963419.png",
          "color": "#5186DB"
        }
      },
      "PackBot": {
        "metadata": {
          "id": "PackBot",
          "name": "PackBot",
          "year": 2016,
          "currentStatus": "Operation",
          "type": "Robotics/Navigation",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "SmartHome, Security",
          "hover": "name: PackBot; year: 2016; task: Robotics/Navigation; AI type: Automate; Military use: Operations; Civic use: SmartHome, Security",
          "image": "./assets/noun-bomb-defusing-robot-1036305.png",
          "color": "#5186DB"
        }
      },
      "GISArta": {
        "metadata": {
          "id": "GISArta",
          "name": "GIS Arta",
          "year": 2014,
          "currentStatus": "Operation",
          "type": "PlanningSystem, MultiAgentSystem, RecommenderSystem",
          "MLTask": "Assign",
          "militaryUse": "Logistics",
          "civicUse": "VehicleTasking, Logistics",
          "vair:technique": "dispatch",
          "hover": "name: GIS Arta; year: 2014; task: PlanningSystem, MultiAgentSystem, RecommenderSystem; AI type: Assign; Military use: Logistics; Civic use: VehicleTasking, Logistics",
          "image": "./assets/noun-threat-7566001.png",
          "color": "#51B2DB"
        }
      },
      "IrisGuard": {
        "metadata": {
          "id": "IrisGuard",
          "name": "IrisGuard",
          "year": 2013,
          "currentStatus": "Operation",
          "type": "ComputerVision",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "IdentityVerification, AppUnlocking, AccessGranting",
          "capacity": "BiometricIdentification",
          "hover": "name: IrisGuard; year: 2013; task: ComputerVision; AI type: Recognize; Military use: Intelligence; Civic use: IdentityVerification, AppUnlocking, AccessGranting",
          "image": "./assets/noun-iris-recognition-6831344.png",
          "nounKey": "biometric",
          "color": "#51DBD9"
        }
      },
      "Skynet-US": {
        "metadata": {
          "id": "Skynet-US",
          "name": "Skynet-US",
          "year": 2012,
          "currentStatus": "Operation",
          "type": "AnomalyDetection, MultiAgentSystem, BehaviorModeling, RecommenderSystem",
          "MLTask": "Predict",
          "militaryUse": "Intelligence",
          "civicUse": "DataBrokers, Marketing, BehaviorEvaluation",
          "hover": "name: Skynet-US; year: 2012; task: AnomalyDetection, MultiAgentSystem, BehaviorModeling, RecommenderSystem; AI type: Predict; Military use: Intelligence; Civic use: DataBrokers, Marketing, BehaviorEvaluation",
          "image": "./assets/noun-digital-footprint-6806678.png",
          "color": "#5186DB"
        }
      },
      "RobotRiotControl": {
        "metadata": {
          "id": "RobotRiotControl",
          "name": "Robot Riot Control",
          "year": 2011,
          "currentStatus": "Operation",
          "type": "AnomalyDetection, LocationAwareness, BehaviorModeling",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "Policing, Security, BorderPatrol",
          "hover": "name: Robot Riot Control; year: 2011; task: AnomalyDetection, LocationAwareness, BehaviorModeling; AI type: Recognize; Military use: Intelligence; Civic use: Policing, Security, BorderPatrol",
          "image": "./assets/noun-riot-control-national-guards-1584300.png",
          "nounKey": "police",
          "color": "#009ADB"
        }
      },
      "PrisonGuard": {
        "metadata": {
          "id": "PrisonGuard",
          "name": "Prison Guard",
          "year": 2011,
          "currentStatus": "Operation",
          "type": "AnomalyDetection, LocationAwareness, BehaviorModeling",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "Policing, Security, BorderPatrol",
          "hover": "name: Prison Guard; year: 2011; task: AnomalyDetection, LocationAwareness, BehaviorModeling; AI type: Recognize; Military use: Intelligence; Civic use: Policing, Security, BorderPatrol",
          "image": "./assets/noun-police-robot-1119907.png",
          "color": "#009ADB"
        }
      },
      "Pegasus": {
        "metadata": {
          "id": "Pegasus",
          "name": "Pegasus",
          "year": 2011,
          "currentStatus": "Operation",
          "type": "AnomalyDetection, BehaviorModeling",
          "MLTask": "Capture",
          "militaryUse": "Intelligence",
          "civicUse": "BehaviorEvaluation, Surveillance",
          "hover": "name: Pegasus; year: 2011; task: AnomalyDetection, BehaviorModeling; AI type: Capture; Military use: Intelligence; Civic use: BehaviorEvaluation, Surveillance",
          "image": "./assets/noun-digital-footprint-6806678.png",
          "color": "#51DBD9"
        }
      },
      "SentryTech": {
        "metadata": {
          "id": "SentryTech",
          "name": "Sentry-Tech",
          "year": 2010,
          "currentStatus": "Operation",
          "type": "Robotics/Navigation, IntelligentControlSystem",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Policing, Security, BorderPatrol",
          "hover": "name: Sentry-Tech; year: 2010; task: Robotics/Navigation, IntelligentControlSystem; AI type: Automate; Military use: Operations; Civic use: Policing, Security, BorderPatrol",
          "image": "./assets/noun-turret-6749967.png",
          "color": "#51DBD9"
        }
      },
      "SuperAegis": {
        "metadata": {
          "id": "SuperAegis",
          "name": "Super Aegis",
          "year": 2010,
          "currentStatus": "Operation",
          "type": "Robotics/Navigation, IntelligentControlSystem",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Policing, Security, BorderPatrol",
          "hover": "name: Super Aegis; year: 2010; task: Robotics/Navigation, IntelligentControlSystem; AI type: Automate; Military use: Operations; Civic use: Policing, Security, BorderPatrol",
          "image": "./assets/noun-turret-6749967.png",
          "color": "#009ADB"
        }
      },
      "SentryRobot": {
        "metadata": {
          "id": "SentryRobot",
          "name": "Sentry Robot",
          "year": 2010,
          "currentStatus": "Operation",
          "type": "Robotics/Navigation, IntelligentControlSystem",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Policing, Security, BorderPatrol",
          "hover": "name: Sentry Robot; year: 2010; task: Robotics/Navigation, IntelligentControlSystem; AI type: Automate; Military use: Operations; Civic use: Policing, Security, BorderPatrol",
          "image": "./assets/noun-turret-6749967.png",
          "color": "#009ADB"
        }
      },
      "PRISM": {
        "metadata": {
          "id": "PRISM",
          "name": "PRISM/XKEYSCORE",
          "year": 2007,
          "currentStatus": "Retirement",
          "type": "DataManagement, AnomalyDetection",
          "MLTask": "Capture, Store",
          "militaryUse": "Intelligence",
          "civicUse": "BehaviorEvaluation, Surveillance, Marketing, DataBrokers",
          "hover": "name: PRISM/XKEYSCORE; year: 2007; task: DataManagement, AnomalyDetection; AI type: Capture, Store; Military use: Intelligence; Civic use: BehaviorEvaluation, Surveillance, Marketing, DataBrokers",
          "image": "./assets/noun-digital-footprint-6806678.png",
          "color": "#5186DB"
        }
      },
      "DynaSpeak": {
        "metadata": {
          "id": "DynaSpeak",
          "name": "DynaSpeak",
          "year": 2006,
          "currentStatus": "Retirement",
          "type": "NLP",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "NaturalLanguageProcessing, TranslationApps",
          "hover": "name: DynaSpeak; year: 2006; task: NLP; AI type: Recognize; Military use: Intelligence; Civic use: NaturalLanguageProcessing, TranslationApps",
          "image": "./assets/noun-speech-recognition-1870316.png",
          "color": "#5186DB"
        }
      },
      "CALO": {
        "metadata": {
          "id": "CALO",
          "name": "CALO",
          "year": 2003,
          "currentStatus": "Retirement",
          "type": "Agent",
          "MLTask": "Generate",
          "militaryUse": "Command",
          "civicUse": "AIAssistants",
          "hover": "name: CALO; year: 2003; task: Agent; AI type: Generate; Military use: Command; Civic use: AIAssistants",
          "image": "./assets/noun-chatbot-7107716.png",
          "nounKey": "chatbot",
          "color": "#5186DB"
        }
      },
      "GoldenShield": {
        "metadata": {
          "id": "GoldenShield",
          "name": "Golden Shield",
          "year": 2003,
          "currentStatus": "Operation",
          "type": "DataManagement, AnomalyDetection",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "BehaviorEvaluation, Surveillance, Marketing, DataBrokers",
          "hover": "name: Golden Shield; year: 2003; task: DataManagement, AnomalyDetection; AI type: Recognize; Military use: Intelligence; Civic use: BehaviorEvaluation, Surveillance, Marketing, DataBrokers",
          "image": "./assets/noun-cctv-5477699.png",
          "color": "#009ADB"
        }
      },
      "SharpEyes": {
        "metadata": {
          "id": "SharpEyes",
          "name": "Sharp Eyes",
          "year": 2003,
          "currentStatus": "Operation",
          "type": "FacialRecognition, ComputerVision",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "IdentityVerification, Security, Policing",
          "hover": "name: Sharp Eyes; year: 2003; task: FacialRecognition, ComputerVision; AI type: Recognize; Military use: Intelligence; Civic use: IdentityVerification, Security, Policing",
          "image": "./assets/noun-cctv-5477699.png",
          "color": "#009ADB"
        }
      },
      "Skynet-PRC": {
        "metadata": {
          "id": "Skynet-PRC",
          "name": "Skynet-PRC",
          "year": 2003,
          "currentStatus": "Operation",
          "type": "LocationAwareness",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "Security, Policing, LocationAnalytics",
          "hover": "name: Skynet-PRC; year: 2003; task: LocationAwareness; AI type: Recognize; Military use: Intelligence; Civic use: Security, Policing, LocationAnalytics",
          "image": "./assets/noun-cctv-5477699.png",
          "color": "#009ADB"
        }
      },
      "Lattice": {
        "metadata": {
          "id": "Lattice",
          "name": "Lattice",
          "year": 2025,
          "currentStatus": "Deployment",
          "type": "PlanningSystem, MultiAgentSystem, RecommenderSystem",
          "MLTask": "Assign",
          "militaryUse": "Command",
          "civicUse": "Policing, ScientificResearch",
          "MLTasks": "ComputerVision, Classification, Tracking, Detection, EdgeComputing, SignalAnalysis, ObjectRecognition",
          "output": "Action, Content, Decision",
          "impact": "PhysicalInjury, Overreliance, DistortionInHumanBehavior",
          "hover": "name: Lattice; year: 2025; task: PlanningSystem, MultiAgentSystem, RecommenderSystem; AI type: Assign; Military use: Command; Civic use: Policing, ScientificResearch",
          "image": "./assets/noun-surveillance-monitor-6831349.png",
          "color": "#5186DB"
        }
      },
      "Foundry": {
        "metadata": {
          "id": "Foundry",
          "name": "Foundry",
          "year": 2022,
          "currentStatus": "Operation",
          "type": "DataManagement, Agent",
          "MLTask": "Store",
          "militaryUse": "Intelligence",
          "civicUse": "Policing, PrivateSecurity, BorderPatrol, BehaviorEvaluation, Surveillance, Marketing, DataBrokers",
          "MLTasks": "SemanticSearch, Ontologies, DataAnalysis",
          "hover": "name: Foundry; year: 2022; task: DataManagement, Agent; AI type: Store; Military use: Intelligence; Civic use: Policing, PrivateSecurity, BorderPatrol, BehaviorEvaluation, Surveillance, Marketing, DataBrokers",
          "image": "./assets/noun-ai-training-data-2985134.png",
          "color": "#51B2DB"
        }
      },
      "Fortify": {
        "metadata": {
          "id": "Fortify",
          "name": "(Mobile) Fortify",
          "year": 2020,
          "currentStatus": "Operation",
          "type": "DataManagement, FacialRecognition, ComputerVision",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "IdentityVerification, Security, Policing",
          "MLTasks": "Classification",
          "capacity": "FaceRecognition",
          "hover": "name: (Mobile) Fortify; year: 2020; task: DataManagement, FacialRecognition, ComputerVision; AI type: Recognize; Military use: Intelligence; Civic use: IdentityVerification, Security, Policing",
          "image": "./assets/noun-facial-recognition-4116350.png",
          "color": "#51DBD9"
        }
      },
      "Sentry": {
        "metadata": {
          "id": "Sentry",
          "name": "Sentry",
          "year": 2018,
          "currentStatus": "Operation",
          "type": "IntelligentControlSystem, IoT",
          "MLTask": "Automate",
          "militaryUse": "Intelligence",
          "civicUse": "BorderPatrol, Policing",
          "hover": "name: Sentry; year: 2018; task: IntelligentControlSystem, IoT; AI type: Automate; Military use: Intelligence; Civic use: BorderPatrol, Policing",
          "image": "./assets/noun-tower-111722.png",
          "color": "#51DBD9"
        }
      },
      "Mantacus": {
        "metadata": {
          "id": "Mantacus",
          "name": "Mantacus",
          "year": 2022,
          "currentStatus": "Development",
          "type": "ComputerVision, AnomalyDetection",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "Policing, CrowdControl, PrivateSecurity",
          "MLTasks": "SignalAnalysis",
          "capacity": "ObjectRecognition",
          "output": "Decision",
          "impact": "Overreliance, WellbeingImpact",
          "hover": "name: Mantacus; year: 2022; task: ComputerVision, AnomalyDetection; AI type: Recognize; Military use: Intelligence; Civic use: Policing, CrowdControl, PrivateSecurity",
          "image": "./assets/noun-pose-estimation-6860082.png",
          "color": "#51DBAB"
        }
      },
      "AIVerse": {
        "metadata": {
          "id": "AIVerse",
          "name": "AIVerse",
          "year": 2021,
          "currentStatus": "Deployment",
          "type": "GenerativeAI",
          "MLTask": "Generate",
          "militaryUse": "Command",
          "civicUse": "SmartHome, Security",
          "MLTasks": "SyntheticData, ObjectRecognition, PoseRecognition, Classification",
          "purpose": "Monitoring, DetectingIndividuals",
          "capacity": "ObjectDetection, PoseEstimation, Classification",
          "hover": "name: AIVerse; year: 2021; task: GenerativeAI; AI type: Generate; Military use: Command; Civic use: SmartHome, Security",
          "image": "./assets/noun-classification-6860055.png",
          "color": "#51DBAB"
        }
      },
      "Vector": {
        "metadata": {
          "id": "Vector",
          "name": "Vector",
          "year": 2020,
          "currentStatus": "Deployment",
          "type": "Robotics/Navigation",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Policing, Surveillance",
          "output": "Action, Content",
          "impact": "PhysicalInjury, WellbeingImpact, PsychologicalHarm",
          "hover": "name: Vector; year: 2020; task: Robotics/Navigation; AI type: Automate; Military use: Operations; Civic use: Policing, Surveillance",
          "image": "./assets/noun-drone-strike-75130.png",
          "color": "#51DBAB"
        }
      },
      "EagleEye": {
        "metadata": {
          "id": "EagleEye",
          "name": "Eagle Eye / SBMC Next",
          "year": 2025,
          "currentStatus": "Development",
          "type": "ComputerVision",
          "MLTask": "Recognize",
          "militaryUse": "Intelligence",
          "civicUse": "AR, VR, Games",
          "MLTasks": "ObjectClassification, PoseEstimation",
          "hover": "name: Eagle Eye / SBMC Next; year: 2025; task: ComputerVision; AI type: Recognize; Military use: Intelligence; Civic use: AR, VR, Games",
          "image": "./assets/noun-virtual-headset-7137401.png",
          "color": "#5186DB"
        }
      },
      "Thunderforge": {
        "metadata": {
          "id": "Thunderforge",
          "name": "Project Thunderforge",
          "year": 2025,
          "currentStatus": "Development",
          "type": "Agent, MultiAgentSystem, PlanningSystem",
          "MLTask": "Generate",
          "militaryUse": "Command",
          "civicUse": "AIAssistants, Chatbots",
          "hover": "name: Project Thunderforge; year: 2025; task: Agent, MultiAgentSystem, PlanningSystem; AI type: Generate; Military use: Command; Civic use: AIAssistants, Chatbots",
          "image": "./assets/noun-chatbot-7107716.png",
          "color": "#515ADB"
        }
      },
      "Jericho": {
        "metadata": {
          "id": "Jericho",
          "name": "Jericho, StrikeWeb",
          "year": 2021,
          "currentStatus": "Deployment",
          "type": "IntelligentControlSystem, IoT",
          "MLTask": "Automate",
          "militaryUse": "Intelligence",
          "civicUse": "SmartHome, EdgeComputing",
          "hover": "name: Jericho, StrikeWeb; year: 2021; task: IntelligentControlSystem, IoT; AI type: Automate; Military use: Intelligence; Civic use: SmartHome, EdgeComputing",
          "image": "./assets/noun-tower-111722.png",
          "color": "#51DBAB"
        }
      },
      "Atlas": {
        "metadata": {
          "id": "Atlas",
          "name": "Atlas",
          "year": "n.d.",
          "currentStatus": "Operation",
          "type": "Robotics/Navigation",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Policing, CrowdControl, PrivateSecurity, ScientificResearch",
          "MLTasks": "SignalAnalysis, ObjectDetection, Classification",
          "hover": "name: Atlas; year: n.d.; task: Robotics/Navigation; AI type: Automate; Military use: Operations; Civic use: Policing, CrowdControl, PrivateSecurity, ScientificResearch",
          "image": "./assets/noun-drone-strike-75130.png",
          "color": "#51DBAB"
        }
      },
      "Mithra": {
        "metadata": {
          "id": "Mithra",
          "name": "MithraOS",
          "year": 2022,
          "currentStatus": "Deployment",
          "type": "Robotics/Navigation",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "SmartHome, Security",
          "hover": "name: MithraOS; year: 2022; task: Robotics/Navigation; AI type: Automate; Military use: Operations; Civic use: SmartHome, Security",
          "image": "./assets/noun-bomb-defusing-robot-1036305.png",
          "color": "#51DBAB"
        }
      },
      "Donovan": {
        "metadata": {
          "id": "Donovan",
          "name": "Donovan",
          "year": 2023,
          "currentStatus": "Development",
          "type": "Agent",
          "MLTask": "Generate",
          "militaryUse": "Command",
          "civicUse": "AIAssistants, Chatbots",
          "MLTasks": "TextGeneration, TransformerModel, AgentAction, Automation",
          "impact": "DistortionInHumanBehavior, Overreliance, WellbeingImpact",
          "hover": "name: Donovan; year: 2023; task: Agent; AI type: Generate; Military use: Command; Civic use: AIAssistants, Chatbots",
          "image": "./assets/noun-chatbot-7107716.png",
          "nounKey": "assistant",
          "color": "#5186DB"
        }
      },
      "Hivemind": {
        "metadata": {
          "id": "Hivemind",
          "name": "Hivemind",
          "year": 2015,
          "currentStatus": "Deployment",
          "type": "Agent, Robotics/Navigation",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Policing, Security, BorderPatrol",
          "hover": "name: Hivemind; year: 2015; task: Agent, Robotics/Navigation; AI type: Automate; Military use: Operations; Civic use: Policing, Security, BorderPatrol",
          "image": "./assets/noun-drone-strike-75130.png",
          "color": "#5186DB"
        }
      },
      "Centaur": {
        "metadata": {
          "id": "Centaur",
          "name": "Centaur",
          "year": 2024,
          "currentStatus": "Deployment",
          "type": "Agent, Robotics/Navigation",
          "MLTask": "Automate",
          "militaryUse": "Operations",
          "civicUse": "Policing, Security, BorderPatrol",
          "hover": "name: Centaur; year: 2024; task: Agent, Robotics/Navigation; AI type: Automate; Military use: Operations; Civic use: Policing, Security, BorderPatrol",
          "image": "./assets/noun-drone-strike-75130.png",
          "color": "#51B2DB"
        }
      },
      "Altra": {
        "metadata": {
          "id": "Altra",
          "name": "Altra",
          "year": "n.d.",
          "currentStatus": "Operation",
          "type": "Robotics/Navigation",
          "MLTask": "Automate",
          "militaryUse": "Command",
          "civicUse": "Policing, Security, BorderPatrol",
          "hover": "name: Altra; year: n.d.; task: Robotics/Navigation; AI type: Automate; Military use: Command; Civic use: Policing, Security, BorderPatrol",
          "image": "./assets/noun-drone-strike-75130.png",
          "color": "#51B2DB"
        }
      },
      "Claude": {
        "metadata": {
          "id": "Claude",
          "name": "Claude",
          "year": 2023,
          "currentStatus": "Operation",
          "type": "Generative",
          "hover": "name: Claude; year: 2023; type: Generative",
          "image": "./assets/noun-text-generator-6059191.png",
          "nounKey": "textgenerator",
          "color": "#51B2DB"
        }
      },
      "Roomba": {
        "metadata": {
          "id": "Roomba",
          "name": "Roomba",
          "year": 2002,
          "currentStatus": "Operation",
          "type": "IoT",
          "hover": "name: Roomba; year: 2002; type: IoT",
          "image": "./assets/noun-robot-vacuum-6793770.png",
          "nounKey": "smartHome",
          "color": "#5186DB"
        }
      },
      "Llama": {
        "metadata": {
          "id": "Llama",
          "name": "Llama",
          "year": 2023,
          "currentStatus": "Operation",
          "type": "Generative",
          "hover": "name: Llama; year: 2023; type: Generative",
          "image": "./assets/noun-text-generator-6059191.png",
          "nounKey": "textgenerator",
          "color": "#515ADB"
        }
      },
      "Facebook": {
        "metadata": {
          "id": "Facebook",
          "name": "Facebook",
          "year": 2004,
          "currentStatus": "Operation",
          "type": "Social",
          "hover": "name: Facebook; year: 2004; type: Social",
          "image": "./assets/noun-social-media-platform-7481620.png",
          "nounKey": "platform",
          "color": "#515ADB"
        }
      },
      "WhatsApp": {
        "metadata": {
          "id": "WhatsApp",
          "name": "WhatsApp",
          "year": 2009,
          "currentStatus": "Operation",
          "type": "Social",
          "hover": "name: WhatsApp; year: 2009; type: Social",
          "image": "./assets/noun-social-media-platform-7481620.png",
          "nounKey": "platform",
          "color": "#515ADB"
        }
      },
      "ChatGPT": {
        "metadata": {
          "id": "ChatGPT",
          "name": "ChatGPT",
          "year": 2022,
          "currentStatus": "Operation",
          "type": "Generative",
          "hover": "name: ChatGPT; year: 2022; type: Generative",
          "image": "./assets/noun-text-generator-6059191.png",
          "nounKey": "textgenerator",
          "color": "#5186DB"
        }
      },
      "Gemini": {
        "metadata": {
          "id": "Gemini",
          "name": "Gemini/Bard",
          "year": 2024,
          "currentStatus": "Operation",
          "type": "Generative",
          "hover": "name: Gemini/Bard; year: 2024; type: Generative",
          "image": "./assets/noun-text-generator-6059191.png",
          "nounKey": "textgenerator",
          "color": "#51DBD9"
        }
      },
      "DoorDash": {
        "metadata": {
          "id": "DoorDash",
          "name": "DoorDash",
          "year": 2012,
          "currentStatus": "Operation",
          "type": "App",
          "hover": "name: DoorDash; year: 2012; type: App",
          "image": "./assets/noun-social-media-platform-7481620.png",
          "nounKey": "logistics",
          "color": "#51DBAB"
        }
      },
      "Oculus": {
        "metadata": {
          "id": "Oculus",
          "name": "Oculus Rift",
          "year": 2012,
          "currentStatus": "Operation",
          "type": "XR",
          "hover": "name: Oculus Rift; year: 2012; type: XR",
          "image": "./assets/noun-virtual-headset-7137401.png",
          "nounKey": "VR",
          "color": "#5186DB"
        }
      },
      "Hololens": {
        "metadata": {
          "id": "Hololens",
          "name": "Hololens 2",
          "year": 2016,
          "currentStatus": "Operation",
          "type": "XR",
          "hover": "name: Hololens 2; year: 2016; type: XR",
          "image": "./assets/noun-virtual-headset-7137401.png",
          "nounKey": "AR",
          "color": "#5186DB"
        }
      },
      "Vertex": {
        "metadata": {
          "id": "Vertex",
          "name": "Vertex",
          "year": 2019,
          "currentStatus": "Development",
          "type": "Storage",
          "hover": "name: Vertex; year: 2019; type: Storage",
          "image": "./assets/noun-locked-cloud-5565062.png",
          "nounKey": "cloud",
          "color": "#51DBD9"
        }
      },
      "Pokemon": {
        "metadata": {
          "id": "Pokemon",
          "name": "Pokemon Go",
          "year": 2016,
          "currentStatus": "Operation",
          "type": "XR",
          "hover": "name: Pokemon Go; year: 2016; type: XR",
          "image": "./assets/noun-photogrammetry-4284363.png",
          "nounKey": "game",
          "color": "#5186DB"
        }
      },
      "Siri": {
        "metadata": {
          "id": "Siri",
          "name": "Siri",
          "year": 2011,
          "currentStatus": "Operation",
          "type": "Agent",
          "hover": "name: Siri; year: 2011; type: Agent",
          "image": "./assets/noun-chatbot-7107716.png",
          "nounKey": "assistant",
          "color": "#5186DB"
        }
      },
      "Medicare": {
        "metadata": {
          "id": "Medicare",
          "name": "US Medicare Fraud Detection (CMS)",
          "year": 2023,
          "currentStatus": "Operation",
          "type": "App",
          "hover": "name: US Medicare Fraud Detection (CMS); year: 2023; type: App",
          "image": "./assets/noun-health-insurance-7667596.png",
          "nounKey": "system",
          "color": "#5186DB"
        }
      },
      "Paypal": {
        "metadata": {
          "id": "Paypal",
          "name": "Paypal",
          "year": 1998,
          "currentStatus": "Operation",
          "type": "App",
          "hover": "name: Paypal; year: 1998; type: App",
          "image": "./assets/noun-software-industry-198331.png",
          "nounKey": "platform",
          "color": "#51B2DB"
        }
      },
      "Spotify": {
        "metadata": {
          "id": "Spotify",
          "name": "Spotify",
          "year": 2006,
          "currentStatus": "Operation",
          "type": "App",
          "hover": "name: Spotify; year: 2006; type: App",
          "image": "./assets/noun-social-media-platform-7481620.png",
          "nounKey": "platform",
          "color": "#51DBAB"
        }
      },
      "Twitter": {
        "metadata": {
          "id": "Twitter",
          "name": "Twitter/X",
          "year": 2006,
          "currentStatus": "Operation",
          "type": "Social",
          "hover": "name: Twitter/X; year: 2006; type: Social",
          "image": "./assets/noun-social-media-platform-7481620.png",
          "nounKey": "platform",
          "color": "#5186DB"
        }
      },
      "Ring": {
        "metadata": {
          "id": "Ring",
          "name": "Ring",
          "year": 2013,
          "currentStatus": "Operation",
          "type": "Utility",
          "hover": "name: Ring; year: 2013; type: Utility",
          "image": "./assets/noun-cctv-5477699.png",
          "nounKey": "surveillanceCamera",
          "color": "#51B2DB"
        }
      },
      "Citizen": {
        "metadata": {
          "id": "Citizen",
          "name": "Citizen",
          "year": 2017,
          "currentStatus": "Operation",
          "type": "Social",
          "hover": "name: Citizen; year: 2017; type: Social",
          "image": "./assets/noun-social-media-platform-7481620.png",
          "nounKey": "platform",
          "color": "#51B2DB"
        }
      },
      "Outlier": {
        "metadata": {
          "id": "Outlier",
          "name": "Outlier & Remotetasks",
          "year": 2017,
          "currentStatus": "Operation",
          "type": "App",
          "hover": "name: Outlier & Remotetasks; year: 2017; type: App",
          "image": "./assets/noun-ai-training-data-2985134.png",
          "nounKey": "trainingdataset",
          "color": "#515ADB"
        }
      },
      "Neko": {
        "metadata": {
          "id": "Neko",
          "name": "Neko Health",
          "year": 2018,
          "currentStatus": "Deployment",
          "type": "Utility",
          "hover": "name: Neko Health; year: 2018; type: Utility",
          "image": "./assets/noun-health-insurance-7667596.png",
          "nounKey": "healthcare",
          "color": "#51B2DB"
        }
      },
      "Instagram": {
        "metadata": {
          "id": "Instagram",
          "name": "Instagram",
          "year": 2010,
          "currentStatus": "Operation",
          "type": "Social",
          "hover": "name: Instagram; year: 2010; type: Social",
          "image": "./assets/noun-social-media-platform-7481620.png",
          "nounKey": "platform",
          "color": "#515ADB"
        }
      },
      "TikTok": {
        "metadata": {
          "id": "TikTok",
          "name": "TikTok",
          "year": 2017,
          "currentStatus": "Operation",
          "type": "Social",
          "hover": "name: TikTok; year: 2017; type: Social",
          "image": "./assets/noun-social-media-platform-7481620.png",
          "nounKey": "platform",
          "color": "#515ADB"
        }
      },
      "Dehomag": {
        "metadata": {
          "id": "Dehomag",
          "name": "IBM Dehomag",
          "year": 1933,
          "currentStatus": "Retirement",
          "type": "DataManagement",
          "militaryUse": "Personnel, Logistics",
          "civicUse": "HumanResources, Census",
          "hover": "name: IBM Dehomag; year: 1933; type: DataManagement",
          "image": "./assets/noun-punch-card-5134996.png",
          "color": "#515ADB"
        }
      },
      "Translator": {
        "metadata": {
          "id": "Translator",
          "name": "IBM Simultaneous Translator",
          "year": 1945,
          "currentStatus": "Retirement",
          "type": "Language",
          "militaryUse": "Command",
          "civicUse": "Translation",
          "hover": "name: IBM Simultaneous Translator; year: 1945; type: Language",
          "image": "./assets/noun-speech-recognition-1870316.png",
          "color": "#515ADB"
        }
      },
      "ELIZA": {
        "metadata": {
          "id": "ELIZA",
          "name": "ELIZA",
          "year": 1966,
          "currentStatus": "Retirement",
          "type": "Language",
          "militaryUse": "Command",
          "civicUse": "Communication",
          "hover": "name: ELIZA; year: 1966; type: Language",
          "image": "./assets/noun-chatbot-7107716.png",
          "color": "#5186DB"
        }
      },
      "Shoebox": {
        "metadata": {
          "id": "Shoebox",
          "name": "Shoebox",
          "year": 1964,
          "currentStatus": "Retirement",
          "type": "Language",
          "militaryUse": "Command",
          "civicUse": "Communication",
          "hover": "name: Shoebox; year: 1964; type: Language",
          "image": "./assets/noun-speech-recognition-1870316.png",
          "color": "#515ADB"
        }
      },
      "ARPANET": {
        "metadata": {
          "id": "ARPANET",
          "name": "ARPANET",
          "year": 1969,
          "currentStatus": "Retirement",
          "type": "Network",
          "militaryUse": "Command",
          "civicUse": "Internet",
          "hover": "name: ARPANET; year: 1969; type: Network",
          "image": "./assets/noun-networking-2909312.png",
          "color": "#5186DB"
        }
      },
      "Onavo": {
        "metadata": {
          "id": "Onavo",
          "name": "Onavo",
          "year": 2010,
          "currentStatus": "Retirement",
          "type": "Analytics, Potential spyware",
          "militaryUse": "Intelligence",
          "civicUse": "DataBrokers, Marketing, BehaviorEvaluation",
          "MLTask": "Predict",
          "hover": "name: Onavo; year: 2010; type: Analytics, Potential spyware",
          "image": "./assets/noun-digital-footprint-6806678.png",
          "color": "#515ADB"
        }
      },
      "Wiz": {
        "metadata": {
          "id": "Wiz",
          "name": "Wiz",
          "year": 2020,
          "currentStatus": "Aquired",
          "type": "DataManagement",
          "militaryUse": "Store",
          "civicUse": "Logistics, Cybersecurity",
          "MLTask": "CloudComputing, Cybersecurity",
          "hover": "name: Wiz; year: 2020; type: DataManagement",
          "image": "./assets/noun-locked-cloud-5565062.png",
          "color": "#51DBD9"
        }
      },
      "Palestine": {
        "metadata": {
          "id": "Palestine",
          "name": "Palestine",
          "type": "Nation",
          "airo:type": "AISubject",
          "hover": "name: Palestine; stakeholder: Nation; role: AISubject",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51DBD9"
        }
      },
      "Israel": {
        "metadata": {
          "id": "Israel",
          "name": "Israel",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: Israel; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51DBD9"
        }
      },
      "US": {
        "metadata": {
          "id": "US",
          "name": "United States",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: United States; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#5186DB"
        }
      },
      "Iran": {
        "metadata": {
          "id": "Iran",
          "name": "Iran",
          "type": "Nation",
          "airo:type": "AISubject",
          "hover": "name: Iran; stakeholder: Nation; role: AISubject",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51B2DB"
        }
      },
      "Venezuela": {
        "metadata": {
          "id": "Venezuela",
          "name": "Venezuela",
          "type": "Nation",
          "airo:type": "AISubject",
          "hover": "name: Venezuela; stakeholder: Nation; role: AISubject",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51B2DB"
        }
      },
      "Ukraine": {
        "metadata": {
          "id": "Ukraine",
          "name": "Ukraine",
          "type": "Nation",
          "airo:type": "AIDeployer, AISubject",
          "hover": "name: Ukraine; stakeholder: Nation; role: AIDeployer, AISubject",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51B2DB"
        }
      },
      "Palantir": {
        "metadata": {
          "id": "Palantir",
          "name": "Palantir",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Palantir; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51B2DB"
        }
      },
      "AWS": {
        "metadata": {
          "id": "AWS",
          "name": "Amazon Web Services",
          "type": "TechCompany",
          "airo:type": "AIDeveloper, AISupplier",
          "hover": "name: Amazon Web Services; stakeholder: TechCompany; role: AIDeveloper, AISupplier",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51B2DB"
        }
      },
      "Russia": {
        "metadata": {
          "id": "Russia",
          "name": "Russia",
          "type": "Nation",
          "airo:type": "AIDeployer, AISubject",
          "hover": "name: Russia; stakeholder: Nation; role: AIDeployer, AISubject",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#5186DB"
        }
      },
      "Syria": {
        "metadata": {
          "id": "Syria",
          "name": "Syria",
          "type": "Nation",
          "airo:type": "AISubject",
          "hover": "name: Syria; stakeholder: Nation; role: AISubject",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#5186DB"
        }
      },
      "Germany": {
        "metadata": {
          "id": "Germany",
          "name": "Germany",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: Germany; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51DBAB"
        }
      },
      "Rheinmetall": {
        "metadata": {
          "id": "Rheinmetall",
          "name": "Rheinmetall",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Rheinmetall; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#51DBAB"
        }
      },
      "Hikvision": {
        "metadata": {
          "id": "Hikvision",
          "name": "Hikvision",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Hikvision; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#51DBD9"
        }
      },
      "TKH": {
        "metadata": {
          "id": "TKH",
          "name": "TKH Security",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: TKH Security; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51DBD9"
        }
      },
      "SpaceX": {
        "metadata": {
          "id": "SpaceX",
          "name": "SpaceX",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: SpaceX; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#5186DB"
        }
      },
      "India": {
        "metadata": {
          "id": "India",
          "name": "India",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: India; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51B2DB"
        }
      },
      "Rafael": {
        "metadata": {
          "id": "Rafael",
          "name": "Rafael",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Rafael; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#51DBD9"
        }
      },
      "Elbit": {
        "metadata": {
          "id": "Elbit",
          "name": "Elbit Systems",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Elbit Systems; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#51DBD9"
        }
      },
      "Amazon": {
        "metadata": {
          "id": "Amazon",
          "name": "Amazon",
          "type": "TechCompany",
          "airo:type": "AIDeveloper, AIProvider",
          "hover": "name: Amazon; stakeholder: TechCompany; role: AIDeveloper, AIProvider",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51B2DB"
        }
      },
      "Google": {
        "metadata": {
          "id": "Google",
          "name": "Google",
          "type": "TechCompany",
          "airo:type": "AIDeveloper, AIProvider",
          "hover": "name: Google; stakeholder: TechCompany; role: AIDeveloper, AIProvider",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51DBD9"
        }
      },
      "Alphabet": {
        "metadata": {
          "id": "Alphabet",
          "name": "Alphabet",
          "type": "TechCompany",
          "airo:type": "AIDeveloper, AIProvider",
          "hover": "name: Alphabet; stakeholder: TechCompany; role: AIDeveloper, AIProvider",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51DBD9"
        }
      },
      "Oracle": {
        "metadata": {
          "id": "Oracle",
          "name": "Oracle",
          "type": "TechCompany",
          "airo:type": "AIDeveloper, AIProvider",
          "hover": "name: Oracle; stakeholder: TechCompany; role: AIDeveloper, AIProvider",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#515ADB"
        }
      },
      "IBM": {
        "metadata": {
          "id": "IBM",
          "name": "IBM",
          "type": "TechCompany",
          "airo:type": "AIDeveloper, AIProvider",
          "hover": "name: IBM; stakeholder: TechCompany; role: AIDeveloper, AIProvider",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#515ADB"
        }
      },
      "Libya": {
        "metadata": {
          "id": "Libya",
          "name": "Libya",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: Libya; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#5186DB"
        }
      },
      "Azerbaijan": {
        "metadata": {
          "id": "Azerbaijan",
          "name": "Azerbaijan",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: Azerbaijan; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#5186DB"
        }
      },
      "Turkey": {
        "metadata": {
          "id": "Turkey",
          "name": "Turkey",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: Turkey; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#5186DB"
        }
      },
      "UK": {
        "metadata": {
          "id": "UK",
          "name": "United Kingdom",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: United Kingdom; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51DBAB"
        }
      },
      "Vyriy": {
        "metadata": {
          "id": "Vyriy",
          "name": "Vyriy",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Vyriy; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-research-center-198322.png",
          "color": "#51B2DB"
        }
      },
      "Roboneers": {
        "metadata": {
          "id": "Roboneers",
          "name": "Roboneers",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Roboneers; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-research-center-198322.png",
          "color": "#51B2DB"
        }
      },
      "D3": {
        "metadata": {
          "id": "D3",
          "name": "D3",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: D3; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-research-center-198322.png",
          "color": "#51B2DB"
        }
      },
      "Helsing": {
        "metadata": {
          "id": "Helsing",
          "name": "Helsing",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Helsing; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-museum-198296.png",
          "color": "#51B2DB"
        }
      },
      "PG": {
        "metadata": {
          "id": "PG",
          "name": "PG Robotics",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: PG Robotics; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#51B2DB"
        }
      },
      "Skyeton": {
        "metadata": {
          "id": "Skyeton",
          "name": "Skyeton",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Skyeton; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#51B2DB"
        }
      },
      "Swarmer": {
        "metadata": {
          "id": "Swarmer",
          "name": "Swarmer",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Swarmer; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#51B2DB"
        }
      },
      "ClearviewAI": {
        "metadata": {
          "id": "ClearviewAI",
          "name": "Clearview AI",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Clearview AI; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51B2DB"
        }
      },
      "Presage": {
        "metadata": {
          "id": "Presage",
          "name": "Presage",
          "type": "Company",
          "airo:type": "AIDeveloper",
          "hover": "name: Presage; stakeholder: Company; role: AIDeveloper",
          "image": "./assets/noun-research-center-198322.png",
          "color": "#5186DB"
        }
      },
      "Altec": {
        "metadata": {
          "id": "Altec",
          "name": "Altec",
          "type": "Company",
          "airo:type": "AIDeveloper",
          "hover": "name: Altec; stakeholder: Company; role: AIDeveloper",
          "image": "./assets/noun-research-center-198322.png",
          "color": "#5186DB"
        }
      },
      "Niantic": {
        "metadata": {
          "id": "Niantic",
          "name": "Niantic Spatial",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Niantic Spatial; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#5186DB"
        }
      },
      "Arlington": {
        "metadata": {
          "id": "Arlington",
          "name": "Arlington Capital",
          "type": "Investor",
          "airo:type": "AIDeveloper",
          "hover": "name: Arlington Capital; stakeholder: Investor; role: AIDeveloper",
          "image": "./assets/noun-museum-198296.png",
          "color": "#5186DB"
        }
      },
      "Jordan": {
        "metadata": {
          "id": "Jordan",
          "name": "Jordan",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: Jordan; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51DBD9"
        }
      },
      "SouthKorea": {
        "metadata": {
          "id": "SouthKorea",
          "name": "South Korea",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: South Korea; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#009ADB"
        }
      },
      "China": {
        "metadata": {
          "id": "China",
          "name": "China",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: China; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#009ADB"
        }
      },
      "NSO": {
        "metadata": {
          "id": "NSO",
          "name": "NSO Group",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: NSO Group; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51DBD9"
        }
      },
      "Unit8200": {
        "metadata": {
          "id": "Unit8200",
          "name": "Unit 8200",
          "type": "Military",
          "airo:type": "AIDeveloper",
          "hover": "name: Unit 8200; stakeholder: Military; role: AIDeveloper",
          "image": "./assets/noun-locked-location-198286.png",
          "color": "#51DBD9"
        }
      },
      "DARPA": {
        "metadata": {
          "id": "DARPA",
          "name": "DARPA",
          "type": "Military",
          "airo:type": "AIDeveloper",
          "hover": "name: DARPA; stakeholder: Military; role: AIDeveloper",
          "image": "./assets/noun-locked-location-198286.png",
          "color": "#5186DB"
        }
      },
      "Microsoft": {
        "metadata": {
          "id": "Microsoft",
          "name": "Microsoft",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Microsoft; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#5186DB"
        }
      },
      "SRI": {
        "metadata": {
          "id": "SRI",
          "name": "SRI: Stanford Research Institute",
          "type": "Institution",
          "airo:type": "AIDeveloper",
          "hover": "name: SRI: Stanford Research Institute; stakeholder: Institution; role: AIDeveloper",
          "image": "./assets/noun-research-center-198322.png",
          "color": "#5186DB"
        }
      },
      "KyonggiUniversity": {
        "metadata": {
          "id": "KyonggiUniversity",
          "name": "Kyonggi University",
          "type": "Institution",
          "airo:type": "AIDeveloper",
          "hover": "name: Kyonggi University; stakeholder: Institution; role: AIDeveloper",
          "image": "./assets/noun-research-center-198322.png",
          "color": "#009ADB"
        }
      },
      "HanwhaTechwin-Samsung": {
        "metadata": {
          "id": "HanwhaTechwin-Samsung",
          "name": "Hanwha Techwin (formerly Samsung)",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Hanwha Techwin (formerly Samsung); stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#009ADB"
        }
      },
      "DoDAAM": {
        "metadata": {
          "id": "DoDAAM",
          "name": "DoDAAM",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: DoDAAM; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#009ADB"
        }
      },
      "SwissInstitute": {
        "metadata": {
          "id": "SwissInstitute",
          "name": "Swiss Institute",
          "type": "Institution",
          "airo:type": "AIDeveloper",
          "hover": "name: Swiss Institute; stakeholder: Institution; role: AIDeveloper",
          "image": "./assets/noun-research-center-198322.png",
          "color": "#5186DB"
        }
      },
      "UNHCR": {
        "metadata": {
          "id": "UNHCR",
          "name": "UNHCR",
          "type": "Military",
          "airo:type": "AIDeveloper",
          "hover": "name: UNHCR; stakeholder: Military; role: AIDeveloper; notes:The Office of the United Nations High Commissioner for Refugees is a United Nations agency mandated to aid and protect refugees, forcibly displaced communities, and stateless people, and to assist in their voluntary repatriation, local integration or resettlement to a third country. (Wikipedia)",
          "image": "./assets/noun-museum-198296.png",
          "people": "The Office of the United Nations High Commissioner for Refugees is a United Nations agency mandated to aid and protect refugees, forcibly displaced communities, and stateless people, and to assist in their voluntary repatriation, local integration or resettlement to a third country. (Wikipedia)",
          "color": "#51DBD9"
        }
      },
      "UKDSTL": {
        "metadata": {
          "id": "UKDSTL",
          "name": "UKDSTL",
          "type": "Military",
          "airo:type": "AIDeveloper",
          "hover": "name: UK Defence Science and Technology Laboratory; stakeholder: Military; role: AIDeveloper",
          "image": "./assets/noun-locked-location-198286.png",
          "people": "UK Defence Science and Technology Laboratory",
          "color": "#51DBAB"
        }
      },
      "QinetiQ": {
        "metadata": {
          "id": "QinetiQ",
          "name": "QinetiQ",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: QinetiQ; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#51DBAB"
        }
      },
      "UKDES": {
        "metadata": {
          "id": "UKDES",
          "name": "UKDE&S",
          "type": "Military",
          "airo:type": "AIDeveloper",
          "hover": "name: UK Defense Equipment and Support; stakeholder: Military; role: AIDeveloper",
          "image": "./assets/noun-locked-location-198286.png",
          "people": "UK Defense Equipment and Support",
          "color": "#51DBAB"
        }
      },
      "Endeavor": {
        "metadata": {
          "id": "Endeavor",
          "name": "Endeavor",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Endeavor; stakeholder: TechCompany; role: AIDevelopernotes: formerly iRobot, sold to FLIR Systems (Teledyne) 2019",
          "image": "./assets/noun-software-industry-198331.png",
          "people": "formerly iRobot, sold to FLIR Systems (Teledyne) 2019",
          "color": "#5186DB"
        }
      },
      "Blackrock": {
        "metadata": {
          "id": "Blackrock",
          "name": "BlackRock",
          "type": "Investor",
          "airo:type": "AIDeveloper",
          "hover": "name: BlackRock; stakeholder: Investor; role: AIDeveloper",
          "image": "./assets/noun-museum-198296.png",
          "color": "#51DBD9"
        }
      },
      "Stanford": {
        "metadata": {
          "id": "Stanford",
          "name": "Stanford University",
          "type": "Institution",
          "airo:type": "AIDeveloper",
          "hover": "name: Stanford University; stakeholder: Institution; role: AIDeveloper",
          "image": "./assets/noun-museum-198296.png",
          "color": "#5186DB"
        }
      },
      "Anthropic": {
        "metadata": {
          "id": "Anthropic",
          "name": "Anthropic",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Anthropic; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51B2DB"
        }
      },
      "iRobot": {
        "metadata": {
          "id": "iRobot",
          "name": "iRobot",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: iRobot; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#5186DB"
        }
      },
      "Meta": {
        "metadata": {
          "id": "Meta",
          "name": "Meta",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Meta; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#515ADB"
        }
      },
      "OpenAI": {
        "metadata": {
          "id": "OpenAI",
          "name": "OpenAI",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: OpenAI; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#5186DB"
        }
      },
      "Lebanon": {
        "metadata": {
          "id": "Lebanon",
          "name": "Lebanon",
          "type": "Nation",
          "airo:type": "AISubject",
          "hover": "name: Lebanon; stakeholder: Nation; role: AISubject",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51DBD9"
        }
      },
      "GoogleCloud": {
        "metadata": {
          "id": "GoogleCloud",
          "name": "Google Cloud",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Google Cloud; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#5186DB"
        }
      },
      "Azure": {
        "metadata": {
          "id": "Azure",
          "name": "Azure",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Azure; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#5186DB"
        }
      },
      "Mamram": {
        "metadata": {
          "id": "Mamram",
          "name": "Mamram",
          "type": "Military",
          "airo:type": "AIDeployer",
          "hover": "name: Mamram; stakeholder: Military; role: AIDeployer",
          "image": "./assets/noun-locked-location-198286.png",
          "color": "#51DBD9"
        }
      },
      "Anduril": {
        "metadata": {
          "id": "Anduril",
          "name": "Anduril",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Anduril; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#5186DB"
        }
      },
      "Lockheed": {
        "metadata": {
          "id": "Lockheed",
          "name": "Lockheed Martin",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Lockheed Martin; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#515ADB"
        }
      },
      "Booz": {
        "metadata": {
          "id": "Booz",
          "name": "Booz Allen Hamilton",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Booz Allen Hamilton; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#515ADB"
        }
      },
      "PLA-PRC": {
        "metadata": {
          "id": "PLA-PRC",
          "name": "People's Liberation Army",
          "type": "Military",
          "airo:type": "AIDeployer, AIDeveloper",
          "hover": "name: People's Liberation Army, China; stakeholder: Military; role: AIDeployer, AIDeveloper",
          "image": "./assets/noun-locked-location-198286.png",
          "people": "People's Liberation Army China",
          "color": "#009ADB"
        }
      },
      "Deloitte": {
        "metadata": {
          "id": "Deloitte",
          "name": "Deloitte",
          "type": "Investor",
          "airo:type": "AIDeveloper",
          "hover": "name: Deloitte; stakeholder: Investor; role: AIDeveloper",
          "image": "./assets/noun-museum-198296.png",
          "color": "#515ADB"
        }
      },
      "Accenture": {
        "metadata": {
          "id": "Accenture",
          "name": "Accenture",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Accenture; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#515ADB"
        }
      },
      "Databricks": {
        "metadata": {
          "id": "Databricks",
          "name": "Databricks",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Databricks; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#515ADB"
        }
      },
      "Leidos": {
        "metadata": {
          "id": "Leidos",
          "name": "Leidos",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Leidos; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#515ADB"
        }
      },
      "ScaleAI": {
        "metadata": {
          "id": "ScaleAI",
          "name": "ScaleAI",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: ScaleAI; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#515ADB"
        }
      },
      "Snowflake": {
        "metadata": {
          "id": "Snowflake",
          "name": "Snowflake",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Snowflake; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#515ADB"
        }
      },
      "KKR": {
        "metadata": {
          "id": "KKR",
          "name": "KKR Investments",
          "type": "Investor",
          "airo:type": "AIDeveloper",
          "hover": "name: KKR Investments; stakeholder: Investor; role: AIDeveloper",
          "image": "./assets/noun-museum-198296.png",
          "color": "#51DBAB"
        }
      },
      "GTR": {
        "metadata": {
          "id": "GTR",
          "name": "Global Technical Reality Data Centers",
          "type": "TechCompany",
          "airo:type": "AIOperator",
          "hover": "name: Global Technical Reality; stakeholder: TechCompany; role: AIOperator",
          "image": "./assets/noun-software-industry-198331.png",
          "people": "Global Technical Reality",
          "color": "#51DBAB"
        }
      },
      "Hyperoptic": {
        "metadata": {
          "id": "Hyperoptic",
          "name": "Hyperoptic",
          "type": "Utility",
          "airo:type": "Stakeholder",
          "hover": "name: Hyperoptic; stakeholder: Utility; role: Stakeholder",
          "image": "./assets/noun-infrastructure-6195519.png",
          "color": "#51DBAB"
        }
      },
      "Vantage": {
        "metadata": {
          "id": "Vantage",
          "name": "Vantage Towers",
          "type": "Utility",
          "airo:type": "Stakeholder",
          "hover": "name: Vantage Towers; stakeholder: Utility; role: Stakeholder",
          "image": "./assets/noun-infrastructure-6195519.png",
          "color": "#51DBAB"
        }
      },
      "Landeskriminalamt": {
        "metadata": {
          "id": "Landeskriminalamt",
          "name": "German State Police-NRW, Hesse, Bavaria",
          "type": "Police",
          "airo:type": "AIDeployer",
          "hover": "name: German State Police North Rhine Westphalia; stakeholder: Police; role: AIDeployer",
          "image": "./assets/noun-riot-control-national-guards-1584300.png",
          "people": "German State Police NRW",
          "color": "#51B2DB"
        }
      },
      "DanishNP": {
        "metadata": {
          "id": "DanishNP",
          "name": "Danish Police",
          "type": "Police",
          "airo:type": "AIDeployer",
          "hover": "name: Danish National Police; stakeholder: Police; role: AIDeployer",
          "image": "./assets/noun-riot-control-national-guards-1584300.png",
          "people": "Danish National Police",
          "color": "#51B2DB"
        }
      },
      "Denmark": {
        "metadata": {
          "id": "Denmark",
          "name": "Denmark",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: Denmark; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51B2DB"
        }
      },
      "Scopley": {
        "metadata": {
          "id": "Scopley",
          "name": "Scopley Games",
          "type": "TechCompany",
          "airo:type": "AIDeployer",
          "hover": "name: Scopley (Savvy Games); stakeholder: TechCompany; role: AIDeployer",
          "image": "./assets/noun-software-industry-198331.png",
          "people": "Scopley (Savvy Games)",
          "color": "#5186DB"
        }
      },
      "Saudi": {
        "metadata": {
          "id": "Saudi",
          "name": "Saudi Arabia",
          "type": "Nation",
          "airo:type": "AIDeployer, AIDeveloper",
          "hover": "name: Saudi Arabia; stakeholder: Nation; role: AIDeployer, AIDeveloper",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#5186DB"
        }
      },
      "MIT": {
        "metadata": {
          "id": "MIT",
          "name": "MIT",
          "type": "Institution",
          "airo:type": "AIDeveloper",
          "hover": "name: MIT; stakeholder: Institution; role: AIDeveloper",
          "image": "./assets/noun-research-center-198322.png",
          "color": "#5186DB"
        }
      },
      "Spain": {
        "metadata": {
          "id": "Spain",
          "name": "Spain",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: Spain; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51DBAB"
        }
      },
      "NHS": {
        "metadata": {
          "id": "NHS",
          "name": "UK NHS",
          "type": "Institution",
          "airo:type": "AIDeployer",
          "hover": "name: UK NHS; stakeholder: Institution; role: AIDeployer",
          "image": "./assets/noun-research-center-198322.png",
          "color": "#51B2DB"
        }
      },
      "ICE": {
        "metadata": {
          "id": "ICE",
          "name": "US Immigration (ICE)",
          "type": "Police",
          "airo:type": "AIDeployer",
          "hover": "name: US Immigration (ICE); stakeholder: Police; role: AIDeployer",
          "image": "./assets/noun-riot-control-national-guards-1584300.png",
          "color": "#51B2DB"
        }
      },
      "DIANA": {
        "metadata": {
          "id": "DIANA",
          "name": "DIANA",
          "type": "Military",
          "airo:type": "AIDeployer, AIDeveloper",
          "hover": "name: Defence Innovation Accelerator for the North Atlantic (DIANA); stakeholder: Military; role: AIDeployer, AIDeveloper",
          "image": "./assets/noun-locked-location-198286.png",
          "color": "#51DBAB"
        }
      },
      "NATO": {
        "metadata": {
          "id": "NATO",
          "name": "NATO",
          "type": "Military",
          "airo:type": "AIDeployer",
          "hover": "name: NATO; stakeholder: Military; role: AIDeployer",
          "image": "./assets/noun-locked-location-198286.png",
          "people": "North Atlantic Treaty Organization",
          "color": "#51DBAB"
        }
      },
      "Apple": {
        "metadata": {
          "id": "Apple",
          "name": "Apple",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Apple; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#5186DB"
        }
      },
      "GDIT": {
        "metadata": {
          "id": "GDIT",
          "name": "General Dynamics Information Technologies",
          "type": "TechCompany",
          "airo:type": "AIDeployer, AIDeveloper",
          "hover": "name: General Dynamics Information Technologies; stakeholder: TechCompany; role: AIDeployer, AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#5186DB"
        }
      },
      "Corsight": {
        "metadata": {
          "id": "Corsight",
          "name": "Corsight.AI",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Corsight.AI; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51DBD9"
        }
      },
      "Vanguard": {
        "metadata": {
          "id": "Vanguard",
          "name": "Vanguard",
          "type": "Investor",
          "airo:type": "AIDeveloper",
          "hover": "name: Vanguard; stakeholder: Investor; role: AIDeveloper",
          "image": "./assets/noun-museum-198296.png",
          "color": "#51B2DB"
        }
      },
      "CBP": {
        "metadata": {
          "id": "CBP",
          "name": "US Customs and Border Patrol",
          "type": "Police",
          "airo:type": "AIDeployer",
          "hover": "name: US Customs and Border Patrol; stakeholder: Police; role: AIDeployer",
          "image": "./assets/noun-riot-control-national-guards-1584300.png",
          "color": "#51DBD9"
        }
      },
      "Horizon": {
        "metadata": {
          "id": "Horizon",
          "name": "Horizon Europe",
          "type": "Institution",
          "airo:type": "Stakeholder",
          "hover": "name: Horizon Europe; stakeholder: Institution; role: Stakeholder",
          "image": "./assets/noun-research-center-198322.png",
          "color": "#515ADB"
        }
      },
      "QS": {
        "metadata": {
          "id": "QS",
          "name": "Quantum Systems",
          "type": "DefenseCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Quantum Systems; stakeholder: DefenseCompany; role: AIDeveloper",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#51DBAB"
        }
      },
      "DIU": {
        "metadata": {
          "id": "DIU",
          "name": "US Defense Innovation Unit",
          "type": "Military",
          "airo:type": "AIDeployer, AIOperator",
          "hover": "name: US Defense Innovation Unit; stakeholder: Military; role: AIDeployer, AIOperator",
          "image": "./assets/noun-locked-location-198286.png",
          "color": "#5186DB"
        }
      },
      "Axon": {
        "metadata": {
          "id": "Axon",
          "name": "Axon",
          "type": "DefenseCompany",
          "airo:type": "AIDeployer, AIDeveloper",
          "hover": "name: Axon; stakeholder: DefenseCompany; role: AIDeployer, AIDeveloper",
          "image": "./assets/noun-locked-location-198286.png",
          "color": "#51B2DB"
        }
      },
      "USPD": {
        "metadata": {
          "id": "USPD",
          "name": "US Local Police",
          "type": "Police",
          "airo:type": "AIDeployer",
          "hover": "name: US Local Police; stakeholder: Police; role: AIDeployer",
          "image": "./assets/noun-riot-control-national-guards-1584300.png",
          "color": "#51B2DB"
        }
      },
      "201V": {
        "metadata": {
          "id": "201V",
          "name": "201 Ventures",
          "type": "Investor",
          "airo:type": "AIDeveloper",
          "hover": "name: 201 Ventures; stakeholder: Investor; role: AIDeveloper",
          "image": "./assets/noun-museum-198296.png",
          "color": "#51DBAB"
        }
      },
      "Delian": {
        "metadata": {
          "id": "Delian",
          "name": "Delian",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Delian; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51DBAB"
        }
      },
      "NIF": {
        "metadata": {
          "id": "NIF",
          "name": "Nato Innovation Fund",
          "type": "Investor",
          "airo:type": "AIDeveloper",
          "hover": "name: Nato Innovation Fund; stakeholder: Investor; role: AIDeveloper",
          "image": "./assets/noun-museum-198296.png",
          "color": "#51DBAB"
        }
      },
      "Tekever": {
        "metadata": {
          "id": "Tekever",
          "name": "Tekever",
          "type": "AID",
          "airo:type": "AIDeveloper",
          "hover": "name: Tekever; stakeholder: AID; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51DBAB"
        }
      },
      "Portugal": {
        "metadata": {
          "id": "Portugal",
          "name": "Portugal",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: Portugal; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51DBAB"
        }
      },
      "Greece": {
        "metadata": {
          "id": "Greece",
          "name": "Greece",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: Greece; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51DBAB"
        }
      },
      "Airbus": {
        "metadata": {
          "id": "Airbus",
          "name": "Airbus",
          "type": "DefenseCompany",
          "airo:type": "AIDeployer",
          "hover": "name: Airbus; stakeholder: DefenseCompany; role: AIDeployer",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#5186DB"
        }
      },
      "Fraunhofer": {
        "metadata": {
          "id": "Fraunhofer",
          "name": "Fraunhofer Institutes",
          "type": "Institution",
          "airo:type": "AIDeveloper",
          "hover": "name: Fraunhofer Institutes; stakeholder: Institution; role: AIDeveloper",
          "image": "./assets/noun-research-center-198322.png",
          "color": "#51DBAB"
        }
      },
      "ARX": {
        "metadata": {
          "id": "ARX",
          "name": "ARX Robotics",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: ARX Robotics; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#51DBAB"
        }
      },
      "BailleGifford": {
        "metadata": {
          "id": "BailleGifford",
          "name": "Baillie Gifford",
          "type": "Investor",
          "airo:type": "AIDeveloper",
          "hover": "name: Baillie Gifford; stakeholder: Investor; role: AIDeveloper",
          "image": "./assets/noun-museum-198296.png",
          "color": "#51DBAB"
        }
      },
      "ShieldAI": {
        "metadata": {
          "id": "ShieldAI",
          "name": "Shield AI",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Shield AI; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#5186DB"
        }
      },
      "McKinsey": {
        "metadata": {
          "id": "McKinsey",
          "name": "McKinsey",
          "type": "Investor",
          "airo:type": "AIDeveloper",
          "hover": "name: McKinsey; stakeholder: Investor; role: AIDeveloper",
          "image": "./assets/noun-museum-198296.png",
          "color": "#51B2DB"
        }
      },
      "Teledyne": {
        "metadata": {
          "id": "Teledyne",
          "name": "Teledyne FLIR",
          "type": "TechCompany",
          "airo:type": "AIDeveloper",
          "hover": "name: Teledyne FLIR; stakeholder: TechCompany; role: AIDeveloper",
          "image": "./assets/noun-software-industry-198331.png",
          "color": "#5186DB"
        }
      },
      "Italy": {
        "metadata": {
          "id": "Italy",
          "name": "Italy",
          "type": "Nation",
          "airo:type": "AIDeployer",
          "hover": "name: Italy; stakeholder: Nation; role: AIDeployer",
          "image": "./assets/noun-flagged-location-198290.png",
          "color": "#51DBAB"
        }
      },
      "Leonardo": {
        "metadata": {
          "id": "Leonardo",
          "name": "Leonardo",
          "type": "DefenseCompany",
          "airo:type": "AIDeployer",
          "hover": "name: Leonardo; stakeholder: DefenseCompany; role: AIDeployer",
          "image": "./assets/noun-radiation-205518.png",
          "color": "#51DBAB"
        }
      },
      "Luckey": {
        "metadata": {
          "id": "Luckey",
          "name": "Palmer Luckey",
          "type": "Owner, Investor",
          "hover": "name: Palmer Luckey; role: Owner, Investor",
          "image": "./assets/noun-person-2649456.png",
          "color": "#5186DB"
        }
      },
      "Musk": {
        "metadata": {
          "id": "Musk",
          "name": "Elon Musk",
          "type": "Owner, Investor",
          "hover": "name: Elon Musk; role: Owner, Investor",
          "image": "./assets/noun-person-2649456.png",
          "color": "#5186DB"
        }
      },
      "Thiel": {
        "metadata": {
          "id": "Thiel",
          "name": "Peter Thiel",
          "type": "Owner, Investor",
          "hover": "name: Peter Thiel; role: Owner, Investor",
          "image": "./assets/noun-person-2649456.png",
          "color": "#51B2DB"
        }
      },
      "Ellison": {
        "metadata": {
          "id": "Ellison",
          "name": "Larry Ellison",
          "type": "Owner, Investor",
          "hover": "name: Larry Ellison; role: Owner, Investor",
          "image": "./assets/noun-person-2649456.png",
          "color": "#515ADB"
        }
      },
      "Fink": {
        "metadata": {
          "id": "Fink",
          "name": "Larry Fink",
          "type": "CEO, Investor",
          "hover": "name: Larry Fink; role: CEO, Investor",
          "image": "./assets/noun-person-2649456.png",
          "color": "#51DBD9"
        }
      },
      "Vance": {
        "metadata": {
          "id": "Vance",
          "name": "JD Vance",
          "type": "Investor, Politician",
          "hover": "name: JD Vance; role: Investor, Politician",
          "image": "./assets/noun-person-2649456.png",
          "color": "#5186DB"
        }
      },
      "Ek": {
        "metadata": {
          "id": "Ek",
          "name": "Daniel Ek",
          "type": "Owner, Investor",
          "hover": "name: Daniel Ek; role: Owner, Investor",
          "image": "./assets/noun-person-2649456.png",
          "color": "#51B2DB"
        }
      },
      "Scherf": {
        "metadata": {
          "id": "Scherf",
          "name": "Gundbert Scherf",
          "type": "Owner",
          "hover": "name: Gundbert Scherf; role: Owner",
          "image": "./assets/noun-person-2649456.png",
          "color": "#51B2DB"
        }
      },
      "Reil": {
        "metadata": {
          "id": "Reil",
          "name": "Torsten Reil",
          "type": "Owner",
          "hover": "name: Torsten Reil; role: Owner",
          "image": "./assets/noun-person-2649456.png",
          "color": "#51B2DB"
        }
      },
      "Rosen": {
        "metadata": {
          "id": "Rosen",
          "name": "Guy Rosen",
          "type": "Chief Information Security Officer",
          "hover": "name: Guy Rosen; role: Chief Information Security Officer",
          "image": "./assets/noun-person-2649456.png",
          "color": "#515ADB"
        }
      },
      "Rappaport": {
        "metadata": {
          "id": "Rappaport",
          "name": "Assaf Rappaport",
          "type": "Owner",
          "hover": "name: Assaf Rappaport; role: Owner",
          "image": "./assets/noun-person-2649456.png",
          "color": "#51DBD9"
        }
      },
      "Karp": {
        "metadata": {
          "id": "Karp",
          "name": "Alex Karp",
          "type": "Owner",
          "hover": "name: Alex Karp; role: Owner",
          "image": "./assets/noun-person-2649456.png",
          "color": "#51B2DB"
        }
      }
    },
    "edges": [
      {
        "source": "US",
        "target": "LargeGeospatialModels",
        "label": "proposed relationship"
      },
      {
        "source": "US",
        "target": "PolygraphPlus",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "Lavender",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "WheresDaddy",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "LegionX",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "WolfPack",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "AIP",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "MetaConstellation",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "Clearview",
        "label": "employed"
      },
      {
        "source": "Ukraine",
        "target": "Wolly",
        "label": "employed"
      },
      {
        "source": "Ukraine",
        "target": "FirstPOVDrones",
        "label": "employed"
      },
      {
        "source": "UK",
        "target": "MAPLE",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "Gospel",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "Alchemist",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "Nimbus",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "ARCA",
        "label": "employed"
      },
      {
        "source": "Libya",
        "target": "LAW",
        "label": "employed"
      },
      {
        "source": "Palantir",
        "target": "Gotham",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "JEDI",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "FireWeaver",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "FireFactory",
        "label": "employed"
      },
      {
        "source": "Germany",
        "target": "DIAS",
        "label": "employed"
      },
      {
        "source": "India",
        "target": "AFRS",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "Starshield",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "Starlink",
        "label": "employed"
      },
      {
        "source": "Russia",
        "target": "Pantir-SM",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "RedWolf",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "BlueWolf",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "Mabat2000",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "URSA",
        "label": "employed"
      },
      {
        "source": "Germany",
        "target": "TacNet",
        "label": "employed"
      },
      {
        "source": "Syria",
        "target": "Bylina",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "Maven",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "PackBot",
        "label": "employed"
      },
      {
        "source": "Ukraine",
        "target": "GISArta",
        "label": "employed"
      },
      {
        "source": "Jordan",
        "target": "IrisGuard",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "Skynet-US",
        "label": "employed"
      },
      {
        "source": "China",
        "target": "RobotRiotControl",
        "label": "employed"
      },
      {
        "source": "SouthKorea",
        "target": "PrisonGuard",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "Pegasus",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "SentryTech",
        "label": "employed"
      },
      {
        "source": "SouthKorea",
        "target": "SuperAegis",
        "label": "employed"
      },
      {
        "source": "SouthKorea",
        "target": "SentryRobot",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "PRISM",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "DynaSpeak",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "CALO",
        "label": "employed"
      },
      {
        "source": "China",
        "target": "GoldenShield",
        "label": "employed"
      },
      {
        "source": "China",
        "target": "SharpEyes",
        "label": "employed"
      },
      {
        "source": "China",
        "target": "Skynet-PRC",
        "label": "employed"
      },
      {
        "source": "Ukraine",
        "target": "MetaConstellation",
        "label": "employed"
      },
      {
        "source": "Ukraine",
        "target": "Clearview",
        "label": "employed"
      },
      {
        "source": "UNHCR",
        "target": "IrisGuard",
        "label": "employed"
      },
      {
        "source": "Russia",
        "target": "Bylina",
        "label": "employed"
      },
      {
        "source": "Russia",
        "target": "LAW",
        "label": "employed"
      },
      {
        "source": "Azerbaijan",
        "target": "LAW",
        "label": "employed"
      },
      {
        "source": "Ukraine",
        "target": "Starlink",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "Pegasus",
        "label": "employed"
      },
      {
        "source": "MIT",
        "target": "ARPANET",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "Lattice",
        "label": "employed"
      },
      {
        "source": "Lockheed",
        "target": "Llama",
        "label": "employed"
      },
      {
        "source": "Palantir",
        "target": "Llama",
        "label": "employed"
      },
      {
        "source": "Booz",
        "target": "Llama",
        "label": "employed"
      },
      {
        "source": "ICE",
        "target": "Foundry",
        "label": "employed"
      },
      {
        "source": "NHS",
        "target": "Foundry",
        "label": "employed"
      },
      {
        "source": "DanishNP",
        "target": "Gotham",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "Medicare",
        "label": "employed"
      },
      {
        "source": "ICE",
        "target": "Fortify",
        "label": "employed"
      },
      {
        "source": "Israel",
        "target": "Fortify",
        "label": "employed"
      },
      {
        "source": "Unit8200",
        "target": "Fortify",
        "label": "employed"
      },
      {
        "source": "CBP",
        "target": "Fortify",
        "label": "employed"
      },
      {
        "source": "Jericho",
        "target": "UK",
        "label": "employed"
      },
      {
        "source": "UK",
        "target": "Atlas",
        "label": "employed"
      },
      {
        "source": "Airbus",
        "target": "Hivemind",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "Hivemind",
        "label": "employed"
      },
      {
        "source": "Landeskriminalamt",
        "target": "Gotham",
        "label": "employed"
      },
      {
        "source": "ICE",
        "target": "Axon",
        "label": "employed"
      },
      {
        "source": "CBP",
        "target": "Sentry",
        "label": "employed"
      },
      {
        "source": "CBP",
        "target": "Lattice",
        "label": "employed"
      },
      {
        "source": "US",
        "target": "Donovan",
        "label": "employed"
      },
      {
        "source": "Niantic",
        "target": "LargeGeospatialModels",
        "label": "developed"
      },
      {
        "source": "US",
        "target": "PolygraphPlus",
        "label": "developed"
      },
      {
        "source": "Unit8200",
        "target": "Lavender",
        "label": "developed"
      },
      {
        "source": "Unit8200",
        "target": "WheresDaddy",
        "label": "developed"
      },
      {
        "source": "Elbit",
        "target": "LegionX",
        "label": "developed"
      },
      {
        "source": "Unit8200",
        "target": "WolfPack",
        "label": "developed"
      },
      {
        "source": "Palantir",
        "target": "AIP",
        "label": "developed"
      },
      {
        "source": "Palantir",
        "target": "MetaConstellation",
        "label": "developed"
      },
      {
        "source": "ClearviewAI",
        "target": "Clearview",
        "label": "developed"
      },
      {
        "source": "Roboneers",
        "target": "Wolly",
        "label": "developed"
      },
      {
        "source": "Vyriy",
        "target": "FirstPOVDrones",
        "label": "developed"
      },
      {
        "source": "PG",
        "target": "FirstPOVDrones",
        "label": "developed"
      },
      {
        "source": "UKDSTL",
        "target": "MAPLE",
        "label": "developed"
      },
      {
        "source": "Unit8200",
        "target": "Gospel",
        "label": "developed"
      },
      {
        "source": "Unit8200",
        "target": "Alchemist",
        "label": "developed"
      },
      {
        "source": "Google",
        "target": "Nimbus",
        "label": "developed"
      },
      {
        "source": "AWS",
        "target": "Nimbus",
        "label": "developed"
      },
      {
        "source": "Elbit",
        "target": "ARCA",
        "label": "developed"
      },
      {
        "source": "US",
        "target": "LAW",
        "label": "developed"
      },
      {
        "source": "Palantir",
        "target": "Gotham",
        "label": "developed"
      },
      {
        "source": "DARPA",
        "target": "JEDI",
        "label": "developed"
      },
      {
        "source": "Rafael",
        "target": "FireWeaver",
        "label": "developed"
      },
      {
        "source": "Rafael",
        "target": "FireFactory",
        "label": "developed"
      },
      {
        "source": "Germany",
        "target": "DIAS",
        "label": "developed"
      },
      {
        "source": "India",
        "target": "AFRS",
        "label": "developed"
      },
      {
        "source": "SpaceX",
        "target": "Starshield",
        "label": "developed"
      },
      {
        "source": "SpaceX",
        "target": "Starlink",
        "label": "developed"
      },
      {
        "source": "Russia",
        "target": "Pantir-SM",
        "label": "developed"
      },
      {
        "source": "Israel",
        "target": "RedWolf",
        "label": "developed"
      },
      {
        "source": "Israel",
        "target": "BlueWolf",
        "label": "developed"
      },
      {
        "source": "TKH",
        "target": "Mabat2000",
        "label": "developed"
      },
      {
        "source": "DARPA",
        "target": "URSA",
        "label": "developed"
      },
      {
        "source": "Rheinmetall",
        "target": "TacNet",
        "label": "developed"
      },
      {
        "source": "Syria",
        "target": "Bylina",
        "label": "developed"
      },
      {
        "source": "Google",
        "target": "Maven",
        "label": "developed"
      },
      {
        "source": "MIT",
        "target": "ARPANET",
        "label": "developed"
      },
      {
        "source": "Ukraine",
        "target": "GISArta",
        "label": "developed"
      },
      {
        "source": "US",
        "target": "Skynet-US",
        "label": "developed"
      },
      {
        "source": "China",
        "target": "RobotRiotControl",
        "label": "developed"
      },
      {
        "source": "KyonggiUniversity",
        "target": "PrisonGuard",
        "label": "developed"
      },
      {
        "source": "NSO",
        "target": "Pegasus",
        "label": "developed"
      },
      {
        "source": "Rafael",
        "target": "SentryTech",
        "label": "developed"
      },
      {
        "source": "DoDAAM",
        "target": "SuperAegis",
        "label": "developed"
      },
      {
        "source": "HanwhaTechwin-Samsung",
        "target": "SentryRobot",
        "label": "developed"
      },
      {
        "source": "US",
        "target": "PRISM",
        "label": "developed"
      },
      {
        "source": "SRI",
        "target": "DynaSpeak",
        "label": "developed"
      },
      {
        "source": "DARPA",
        "target": "CALO",
        "label": "developed"
      },
      {
        "source": "China",
        "target": "GoldenShield",
        "label": "developed"
      },
      {
        "source": "China",
        "target": "SharpEyes",
        "label": "developed"
      },
      {
        "source": "China",
        "target": "Skynet-PRC",
        "label": "developed"
      },
      {
        "source": "SRI",
        "target": "CALO",
        "label": "developed"
      },
      {
        "source": "SwissInstitute",
        "target": "CALO",
        "label": "developed"
      },
      {
        "source": "SouthKorea",
        "target": "RobotRiotControl",
        "label": "developed"
      },
      {
        "source": "Russia",
        "target": "Bylina",
        "label": "developed"
      },
      {
        "source": "Hikvision",
        "target": "Mabat2000",
        "label": "developed"
      },
      {
        "source": "Turkey",
        "target": "LAW",
        "label": "developed"
      },
      {
        "source": "Israel",
        "target": "LAW",
        "label": "developed"
      },
      {
        "source": "Skyeton",
        "target": "FirstPOVDrones",
        "label": "developed"
      },
      {
        "source": "Swarmer",
        "target": "FirstPOVDrones",
        "label": "developed"
      },
      {
        "source": "D3",
        "target": "Wolly",
        "label": "developed"
      },
      {
        "source": "Presage",
        "target": "PolygraphPlus",
        "label": "developed"
      },
      {
        "source": "Altec",
        "target": "PolygraphPlus",
        "label": "developed"
      },
      {
        "source": "Oracle",
        "target": "JEDI",
        "label": "developed"
      },
      {
        "source": "IBM",
        "target": "JEDI",
        "label": "developed"
      },
      {
        "source": "GoogleCloud",
        "target": "JEDI",
        "label": "developed"
      },
      {
        "source": "Microsoft",
        "target": "JEDI",
        "label": "developed"
      },
      {
        "source": "AWS",
        "target": "JEDI",
        "label": "developed"
      },
      {
        "source": "Helsing",
        "target": "Wolly",
        "label": "developed"
      },
      {
        "source": "QinetiQ",
        "target": "MAPLE",
        "label": "developed"
      },
      {
        "source": "Endeavor",
        "target": "PackBot",
        "label": "developed"
      },
      {
        "source": "Blackrock",
        "target": "Mabat2000",
        "label": "developed"
      },
      {
        "source": "iRobot",
        "target": "Roomba",
        "label": "developed"
      },
      {
        "source": "Anthropic",
        "target": "Claude",
        "label": "developed"
      },
      {
        "source": "Meta",
        "target": "Llama",
        "label": "developed"
      },
      {
        "source": "Meta",
        "target": "Facebook",
        "label": "developed"
      },
      {
        "source": "Meta",
        "target": "WhatsApp",
        "label": "developed"
      },
      {
        "source": "iRobot",
        "target": "PackBot",
        "label": "developed"
      },
      {
        "source": "Anduril",
        "target": "Lattice",
        "label": "developed"
      },
      {
        "source": "OpenAI",
        "target": "Lattice",
        "label": "developed"
      },
      {
        "source": "OpenAI",
        "target": "ChatGPT",
        "label": "developed"
      },
      {
        "source": "Google",
        "target": "Gemini",
        "label": "developed"
      },
      {
        "source": "KKR",
        "target": "DoorDash",
        "label": "developed"
      },
      {
        "source": "Microsoft",
        "target": "Hololens",
        "label": "developed"
      },
      {
        "source": "Saudi",
        "target": "LargeGeospatialModels",
        "label": "developed"
      },
      {
        "source": "Niantic",
        "target": "Pokemon",
        "label": "developed"
      },
      {
        "source": "IBM",
        "target": "Dehomag",
        "label": "developed"
      },
      {
        "source": "IBM",
        "target": "Translator",
        "label": "developed"
      },
      {
        "source": "IBM",
        "target": "Shoebox",
        "label": "developed"
      },
      {
        "source": "Palantir",
        "target": "Foundry",
        "label": "developed"
      },
      {
        "source": "DARPA",
        "target": "ARPANET",
        "label": "developed"
      },
      {
        "source": "Apple",
        "target": "Siri",
        "label": "developed"
      },
      {
        "source": "Palantir",
        "target": "Maven",
        "label": "developed"
      },
      {
        "source": "GDIT",
        "target": "Medicare",
        "label": "developed"
      },
      {
        "source": "Corsight",
        "target": "Fortify",
        "label": "developed"
      },
      {
        "source": "Anduril",
        "target": "Sentry",
        "label": "developed"
      },
      {
        "source": "Mantacus",
        "target": "DIANA",
        "label": "developed"
      },
      {
        "source": "QS",
        "target": "Vector",
        "label": "developed"
      },
      {
        "source": "Anduril",
        "target": "EagleEye",
        "label": "developed"
      },
      {
        "source": "US",
        "target": "EagleEye",
        "label": "developed"
      },
      {
        "source": "Delian",
        "target": "Jericho",
        "label": "developed"
      },
      {
        "source": "Tekever",
        "target": "Atlas",
        "label": "developed"
      },
      {
        "source": "ARX",
        "target": "Mithra",
        "label": "developed"
      },
      {
        "source": "ScaleAI",
        "target": "Donovan",
        "label": "developed"
      },
      {
        "source": "DIU",
        "target": "Donovan",
        "label": "developed"
      },
      {
        "source": "ScaleAI",
        "target": "Outlier",
        "label": "developed"
      },
      {
        "source": "ShieldAI",
        "target": "Hivemind",
        "label": "developed"
      },
      {
        "source": "DIU",
        "target": "Hivemind",
        "label": "developed"
      },
      {
        "source": "ScaleAI",
        "target": "Thunderforge",
        "label": "developed"
      },
      {
        "source": "Microsoft",
        "target": "Thunderforge",
        "label": "developed"
      },
      {
        "source": "Anduril",
        "target": "Thunderforge",
        "label": "developed"
      },
      {
        "source": "Helsing",
        "target": "Centaur",
        "label": "developed"
      },
      {
        "source": "Helsing",
        "target": "Altra",
        "label": "developed"
      },
      {
        "source": "Meta",
        "target": "Instagram",
        "label": "developed"
      },
      {
        "source": "Meta",
        "target": "EagleEye",
        "label": "developed"
      },
      {
        "source": "Lavender",
        "target": "Palestine",
        "label": "used in"
      },
      {
        "source": "Clearview",
        "target": "US",
        "label": "used in"
      },
      {
        "source": "IrisGuard",
        "target": "Jordan",
        "label": "used in"
      },
      {
        "source": "KyonggiUniversity",
        "target": "SouthKorea",
        "label": "based in"
      },
      {
        "source": "NSO",
        "target": "Israel",
        "label": "based in"
      },
      {
        "source": "Arlington",
        "target": "US",
        "label": "based in"
      },
      {
        "source": "FireWeaver",
        "target": "Lebanon",
        "label": "used in"
      },
      {
        "source": "GTR",
        "target": "UK",
        "label": "based in"
      },
      {
        "source": "GTR",
        "target": "Israel",
        "label": "based in"
      },
      {
        "source": "GTR",
        "target": "Spain",
        "label": "based in"
      },
      {
        "source": "Vantage",
        "target": "Germany",
        "label": "based in"
      },
      {
        "source": "Hyperoptic",
        "target": "UK",
        "label": "based in"
      },
      {
        "source": "Vantage",
        "target": "Spain",
        "label": "based in"
      },
      {
        "source": "Translator",
        "target": "Germany",
        "label": "used in"
      },
      {
        "source": "Landeskriminalamt",
        "target": "Germany",
        "label": "based in"
      },
      {
        "source": "DanishNP",
        "target": "Denmark",
        "label": "based in"
      },
      {
        "source": "Corsight",
        "target": "Israel",
        "label": "based in"
      },
      {
        "source": "Delian",
        "target": "Greece",
        "label": "based in"
      },
      {
        "source": "QS",
        "target": "Germany",
        "label": "based in"
      },
      {
        "source": "Helsing",
        "target": "Germany",
        "label": "based in"
      },
      {
        "source": "Leonardo",
        "target": "Italy",
        "label": "based in"
      },
      {
        "source": "Anthropic",
        "target": "Venezuela",
        "label": "used in"
      },
      {
        "source": "Claude",
        "target": "Venezuela",
        "label": "used in"
      },
      {
        "source": "AWS",
        "target": "Venezuela",
        "label": "used in"
      },
      {
        "source": "Palantir",
        "target": "Venezuela",
        "label": "used in"
      },
      {
        "source": "AIP",
        "target": "Venezuela",
        "label": "used in"
      },
      {
        "source": "Anthropic",
        "target": "Iran",
        "label": "used in"
      },
      {
        "source": "Claude",
        "target": "Iran",
        "label": "used in"
      },
      {
        "source": "AWS",
        "target": "Iran",
        "label": "used in"
      },
      {
        "source": "Palantir",
        "target": "Iran",
        "label": "used in"
      },
      {
        "source": "AIP",
        "target": "Iran",
        "label": "used in"
      },
      {
        "source": "DARPA",
        "target": "US",
        "label": "part of"
      },
      {
        "source": "Unit8200",
        "target": "Israel",
        "label": "part of"
      },
      {
        "source": "UKDSTL",
        "target": "UK",
        "label": "part of"
      },
      {
        "source": "UKDES",
        "target": "UK",
        "label": "part of"
      },
      {
        "source": "Stanford",
        "target": "Blackrock",
        "label": "affiliated"
      },
      {
        "source": "Stanford",
        "target": "SRI",
        "label": "affiliated"
      },
      {
        "source": "Palantir",
        "target": "Helsing",
        "label": "affiliated"
      },
      {
        "source": "China",
        "target": "Blackrock",
        "label": "affiliated"
      },
      {
        "source": "Clearview",
        "target": "AFRS",
        "label": "similar"
      },
      {
        "source": "Palantir",
        "target": "Anthropic",
        "label": "affiliated"
      },
      {
        "source": "AWS",
        "target": "Anthropic",
        "label": "affiliated"
      },
      {
        "source": "Syria",
        "target": "Jordan",
        "label": "refugees from"
      },
      {
        "source": "Microsoft",
        "target": "OpenAI",
        "label": "invests in"
      },
      {
        "source": "Israel",
        "target": "Oracle",
        "label": "contracts"
      },
      {
        "source": "GoogleCloud",
        "target": "Google",
        "label": "part of"
      },
      {
        "source": "AWS",
        "target": "Amazon",
        "label": "part of"
      },
      {
        "source": "Google",
        "target": "Alphabet",
        "label": "part of"
      },
      {
        "source": "Azure",
        "target": "Microsoft",
        "label": "part of"
      },
      {
        "source": "Mamram",
        "target": "Israel",
        "label": "part of"
      },
      {
        "source": "Lockheed",
        "target": "Llama",
        "label": "incorporates"
      },
      {
        "source": "Booz",
        "target": "Llama",
        "label": "incorporates"
      },
      {
        "source": "PLA-PRC",
        "target": "Llama",
        "label": "incorporates"
      },
      {
        "source": "Anduril",
        "target": "Llama",
        "label": "affiliated"
      },
      {
        "source": "Accenture",
        "target": "Llama",
        "label": "affiliated"
      },
      {
        "source": "Booz",
        "target": "Llama",
        "label": "affiliated"
      },
      {
        "source": "Deloitte",
        "target": "Llama",
        "label": "affiliated"
      },
      {
        "source": "IBM",
        "target": "Llama",
        "label": "affiliated"
      },
      {
        "source": "Oracle",
        "target": "Llama",
        "label": "affiliated"
      },
      {
        "source": "Databricks",
        "target": "Llama",
        "label": "affiliated"
      },
      {
        "source": "Leidos",
        "target": "Llama",
        "label": "affiliated"
      },
      {
        "source": "ScaleAI",
        "target": "Llama",
        "label": "affiliated"
      },
      {
        "source": "Snowflake",
        "target": "Llama",
        "label": "affiliated"
      },
      {
        "source": "Gemini",
        "target": "Vertex",
        "label": "affiliated"
      },
      {
        "source": "GTR",
        "target": "KKR",
        "label": "part of"
      },
      {
        "source": "Vantage",
        "target": "KKR",
        "label": "part of"
      },
      {
        "source": "Hyperoptic",
        "target": "KKR",
        "label": "part of"
      },
      {
        "source": "Oculus",
        "target": "Anduril",
        "label": "affiliated"
      },
      {
        "source": "Azure",
        "target": "Anduril",
        "label": "relies on"
      },
      {
        "source": "Palantir",
        "target": "Landeskriminalamt",
        "label": "contracts"
      },
      {
        "source": "MIT",
        "target": "ELIZA",
        "label": "affiliated"
      },
      {
        "source": "Jordan",
        "target": "UNHCR",
        "label": "affiliated"
      },
      {
        "source": "Syria",
        "target": "UNHCR",
        "label": "affiliated"
      },
      {
        "source": "Palestine",
        "target": "UNHCR",
        "label": "affiliated"
      },
      {
        "source": "China",
        "target": "PLA-PRC",
        "label": "part of"
      },
      {
        "source": "NATO",
        "target": "DIANA",
        "label": "part of"
      },
      {
        "source": "US",
        "target": "ICE",
        "label": "part of"
      },
      {
        "source": "UK",
        "target": "NHS",
        "label": "part of"
      },
      {
        "source": "UK",
        "target": "NATO",
        "label": "part of"
      },
      {
        "source": "US",
        "target": "NATO",
        "label": "part of"
      },
      {
        "source": "Germany",
        "target": "NATO",
        "label": "member of"
      },
      {
        "source": "Denmark",
        "target": "NATO",
        "label": "member of"
      },
      {
        "source": "Spain",
        "target": "NATO",
        "label": "member of"
      },
      {
        "source": "ARPANET",
        "target": "Stanford",
        "label": "affiliated"
      },
      {
        "source": "WhatsApp",
        "target": "Lavender",
        "label": "provides data to"
      },
      {
        "source": "iRobot",
        "target": "Endeavor",
        "label": "sold part of to"
      },
      {
        "source": "Pokemon",
        "target": "Scopley",
        "label": "sold to"
      },
      {
        "source": "CALO",
        "target": "Siri",
        "label": "based on"
      },
      {
        "source": "Palantir",
        "target": "ICE",
        "label": "contracts"
      },
      {
        "source": "Palantir",
        "target": "DanishNP",
        "label": "contracts"
      },
      {
        "source": "Palantir",
        "target": "NHS",
        "label": "contracts"
      },
      {
        "source": "Palantir",
        "target": "Booz",
        "label": "subcontracts",
        "metadata": {
          "reference": "sam.gov"
        }
      },
      {
        "source": "GDIT",
        "target": "Palantir",
        "label": "subcontracts",
        "metadata": {
          "reference": "sam.gov"
        }
      },
      {
        "source": "ScaleAI",
        "target": "Meta",
        "label": "invests in",
        "metadata": {
          "reference": "x"
        }
      },
      {
        "source": "Blackrock",
        "target": "Palantir",
        "label": "invests in",
        "metadata": {
          "reference": "UN"
        }
      },
      {
        "source": "Blackrock",
        "target": "Amazon",
        "label": "invests in",
        "metadata": {
          "reference": "UN"
        }
      },
      {
        "source": "Blackrock",
        "target": "Microsoft",
        "label": "invests in",
        "metadata": {
          "reference": "UN"
        }
      },
      {
        "source": "Blackrock",
        "target": "Alphabet",
        "label": "invests in",
        "metadata": {
          "reference": "UN"
        }
      },
      {
        "source": "Blackrock",
        "target": "IBM",
        "label": "invests in",
        "metadata": {
          "reference": "UN"
        }
      },
      {
        "source": "Vanguard",
        "target": "Palantir",
        "label": "invests in",
        "metadata": {
          "reference": "UN"
        }
      },
      {
        "source": "IBM",
        "target": "Horizon",
        "label": "invests in",
        "metadata": {
          "reference": "UN, EU"
        }
      },
      {
        "source": "DIANA",
        "target": "Mantacus",
        "label": "invests in",
        "metadata": {
          "reference": "NATO"
        }
      },
      {
        "source": "DIANA",
        "target": "AIVerse",
        "label": "invests in",
        "metadata": {
          "reference": "NATO"
        }
      },
      {
        "source": "DIANA",
        "target": "Vector",
        "label": "invests in",
        "metadata": {
          "reference": "NATO"
        }
      },
      {
        "source": "USPD",
        "target": "Axon",
        "label": "contracts",
        "metadata": {
          "reference": "Press"
        }
      },
      {
        "source": "Citizen",
        "target": "Axon",
        "label": "provides data to",
        "metadata": {
          "reference": "Axon"
        }
      },
      {
        "source": "Ring",
        "target": "Axon",
        "label": "provides data to",
        "metadata": {
          "reference": "Axon"
        }
      },
      {
        "source": "Amazon",
        "target": "Ring",
        "label": "owns"
      },
      {
        "source": "201V",
        "target": "Delian",
        "label": "invests in"
      },
      {
        "source": "Portugal",
        "target": "Tekever",
        "label": "contracts",
        "metadata": {
          "reference": "Tekever"
        }
      },
      {
        "source": "NIF",
        "target": "ARX",
        "label": "invests in"
      },
      {
        "source": "Portugal",
        "target": "NATO",
        "label": "member of"
      },
      {
        "source": "Greece",
        "target": "NATO",
        "label": "member of"
      },
      {
        "source": "NIF",
        "target": "Tekever",
        "label": "invests in"
      },
      {
        "source": "Airbus",
        "target": "QS",
        "label": "partners with"
      },
      {
        "source": "Fraunhofer",
        "target": "QS",
        "label": "partners with"
      },
      {
        "source": "BailleGifford",
        "target": "Tekever",
        "label": "invests in"
      },
      {
        "source": "BailleGifford",
        "target": "Spotify",
        "label": "invests in"
      },
      {
        "source": "Teledyne",
        "target": "Endeavor",
        "label": "sold to"
      },
      {
        "source": "DARPA",
        "target": "iRobot",
        "label": "contracts"
      },
      {
        "source": "DARPA",
        "target": "MIT",
        "label": "contracts"
      },
      {
        "source": "DARPA",
        "target": "Stanford",
        "label": "contracts"
      },
      {
        "source": "Arlington",
        "target": "PackBot",
        "label": "invested in"
      },
      {
        "source": "Meta",
        "target": "Onavo",
        "label": "purchased"
      },
      {
        "source": "Google",
        "target": "Wiz",
        "label": "purchased"
      },
      {
        "source": "Italy",
        "target": "NATO",
        "label": "member of"
      },
      {
        "source": "OpenAI",
        "target": "US",
        "label": "contracts"
      },
      {
        "source": "Luckey",
        "target": "Oculus",
        "label": "founder"
      },
      {
        "source": "Luckey",
        "target": "Anduril",
        "label": "founder"
      },
      {
        "source": "Musk",
        "target": "SpaceX",
        "label": "owner"
      },
      {
        "source": "Thiel",
        "target": "Paypal",
        "label": "founder"
      },
      {
        "source": "Thiel",
        "target": "Palantir",
        "label": "owner"
      },
      {
        "source": "Ellison",
        "target": "Oracle",
        "label": "founder"
      },
      {
        "source": "Fink",
        "target": "Blackrock",
        "label": "founder"
      },
      {
        "source": "Vance",
        "target": "Anduril",
        "label": "investor"
      },
      {
        "source": "Ek",
        "target": "Helsing",
        "label": "investor"
      },
      {
        "source": "Ek",
        "target": "Spotify",
        "label": "founder"
      },
      {
        "source": "Musk",
        "target": "Twitter",
        "label": "owner"
      },
      {
        "source": "Scherf",
        "target": "Helsing",
        "label": "owner"
      },
      {
        "source": "Scherf",
        "target": "McKinsey",
        "label": "former partner"
      },
      {
        "source": "Reil",
        "target": "Helsing",
        "label": "owner"
      },
      {
        "source": "Ek",
        "target": "Neko",
        "label": "owner"
      },
      {
        "source": "Ellison",
        "target": "TikTok",
        "label": "prospective owner"
      },
      {
        "source": "Rosen",
        "target": "Meta",
        "label": "employee"
      },
      {
        "source": "Rosen",
        "target": "Unit8200",
        "label": "unit vetran"
      },
      {
        "source": "Rosen",
        "target": "Onavo",
        "label": "founder"
      },
      {
        "source": "Rappaport",
        "target": "Wiz",
        "label": "founder"
      },
      {
        "source": "Rappaport",
        "target": "Unit8200",
        "label": "unit vetran"
      },
      {
        "source": "Karp",
        "target": "Palantir",
        "label": "CEO"
      }
    ],
    "directed": false,
    "metadata": {
      "edge_opacity": 0.25,
      "node_opacity": 0,
      "edge_label_size": 5,
      "node_label_size": 6,
      "node_click": "Details: $hover"
    }
  }
];
      // Data selection and normalization
      state.nodeSizeDataSource = "size";
      state.useNodeSizeNormalization = false;
      state.nodeSizeNormalizationMin = 5.0;
      state.nodeSizeNormalizationMax = 75.0;
      state.nodeLabelTextDataSource = "name";
      state.edgeSizeDataSource = "size";
      state.useEdgeSizeNormalization = false;
      state.edgeSizeNormalizationMin = 0.2;
      state.edgeSizeNormalizationMax = 5.0;
      state.edgeLabelTextDataSource = "label";
      // Containers
      state.graphContainerHeight = 800;
      state.detailsContainerHeight = 100;
      (state.showDetails = false),
        (state.showDetailsToggleButton = false),
        (state.showMenu = false),
        (state.showMenuToggleButton = true),
        // Nodes
        (state.showNodes = true);
      state.nodeSizeFactor = 1.0;
      state.nodeDragFix = false;
      state.nodeHoverNeighborhood = false;
      state.nodeHoverTooltip = false;
      state.showNodeImages = true;
      state.nodeImageSizeFactor = 1.8;
      state.showNodeLabels = true;
      state.showNodeLabelBorders = false;
      state.nodeLabelSizeFactor = 1.0;
      state.nodeLabelRotation = 0.0;
      state.nodeLabelFont = "Arial";
      // Edges
      state.showEdges = true;
      state.edgeSizeFactor = 1.0;
      state.edgeCurvature = 0;
      (state.edgeHoverTooltip = false), (state.showEdgeLabels = true);
      state.showEdgeLabelBorders = false;
      state.edgeLabelSizeFactor = 1.0;
      state.edgeLabelRotation = 0.0;
      state.edgeLabelFont = "Arial";
      // Layout algorithm
      state.layoutAlgorithmActive = true;
      state.useManyBodyForce = true;
      state.manyBodyForceStrength = -70.0;
      state.manyBodyForceTheta = 0.9;
      state.useManyBodyForceMinDistance = false;
      state.manyBodyForceMinDistance = 10.0;
      state.useManyBodyForceMaxDistance = false;
      state.manyBodyForceMaxDistance = 1000.0;
      state.useLinksForce = true;
      state.linksForceDistance = 50.0;
      state.linksForceStrength = 0.5;
      state.useXPositioningForce = false;
      state.xPositioningForceStrength = 0.2;
      state.useYPositioningForce = false;
      state.yPositioningForceStrength = 0.2;
      state.useZPositioningForce = false;
      state.zPositioningForceStrength = 0.2;
      state.useCenteringForce = true;
      // Other
      state.initZoomFactor = 0.8;
      state.largeGraphThreshold = 200;
    },

    // 2) Derive state.parsedData from state.givenData
    rawDataParser: {
      getBool(obj, prop, def) {
        try {
          const value = obj[prop];
          if (value == "true" || value == "True") {
            value = true;
          } else if (value == "false" || value == "False") {
            value = false;
          }
          if (value !== true && value !== false) {
            throw "Invalid value. Not a bool.";
          }
          return value;
        } catch (e) {
          return def;
        }
        return def;
      },

      getString(obj, prop, def) {
        try {
          const value = String(obj[prop]);
          if (value === "undefined") {
            throw "Invalid value. Not a proper string.";
          }
          return value;
        } catch (e) {
          return def;
        }
        return def;
      },

      getArrayLengthOrZero(array) {
        try {
          const value = parseInt(array.length);
          if (!(value + 1 > 0)) {
            throw "Invalid value. Not a proper length.";
          }
          return value;
        } catch (e) {
          return 0;
        }
      },

      getObjectLengthOrZero(obj) {
        try {
          const value = Object.keys(obj).length;
          if (!(value + 1 > 0)) {
            throw "Invalid value. Not a proper length.";
          }
          return value;
        } catch (e) {
          return 0;
        }
      },

      createUniqueEdgeId(sourceId, targetId, knownEdgeIds) {
        let newEdgeIdBase = "(" + sourceId + ", " + targetId + ")",
          newEdgeId = newEdgeIdBase,
          multiEdgeCounter = 1;
        for (let i = 1; knownEdgeIds.has(newEdgeId); i++) {
          newEdgeId = newEdgeIdBase + "_" + String(i);
          multiEdgeCounter += 1;
        }
        knownEdgeIds.add(newEdgeId);
        return { id: newEdgeId, count: multiEdgeCounter };
      },
    },

    rawMetadataParser: {
      getString(obj, prop, def) {
        try {
          const value = String(obj.metadata[prop]);
          if (value === "undefined") {
            throw "Invalid value. Not a proper string.";
          }
          return value;
        } catch (e) {
          return def;
        }
      },
      getColor(obj, prop, def) {
        function isBodyidColor(strColor) {
          const sty = new Option().style;
          sty.color = strColor;
          return sty.color !== "";
        }
        try {
          const value = obj.metadata[prop];
          if (!isBodyidColor(value)) {
            throw "Invalid value. Not a color.";
          }
          return value;
        } catch (e) {
          return def;
        }
      },
      getFiniteNumber(obj, prop, def) {
        try {
          const value = parseFloat(obj.metadata[prop]);
          if (!isFinite(value) || value === null) {
            throw "Invalid value. Not a finite number.";
          }
          return value;
        } catch (e) {
          return def;
        }
      },
      getFiniteNumberOrNull(obj, prop, def) {
        try {
          const value = parseFloat(obj.metadata[prop]);
          if (!isFinite(value)) {
            // Note: isFinite(null) gives true
            throw "Invalid value. Not a finite number or null.";
          }
          return value;
        } catch (e) {
          return def;
        }
      },
      getFinitePositiveNumber(obj, prop, def) {
        try {
          const value = parseFloat(obj.metadata[prop]);
          if (!isFinite(value) || value === null || value < 0.0) {
            throw "Invalid value. Not a finite positive number.";
          }
          return value;
        } catch (e) {
          return def;
        }
      },
      collectOtherMetadata(sourceObject, targetObject, definedMetadata) {
        if (
          typeof sourceObject !== "undefined" &&
          typeof sourceObject.metadata !== "undefined"
        ) {
          const properties = Object.keys(sourceObject.metadata);
          for (let i = 0; i < properties.length; i++) {
            const property = properties[i];
            if (!definedMetadata.has(property)) {
              targetObject[property] = sourceObject.metadata[property];
            }
          }
        }
      },
    },

    propertyClassifier: {
      numeric: null,
      nonNumeric: null,
      init() {
        (this.numeric = new Set()), (this.nonNumeric = new Set());
      },
      isNumeric(d) {
        return (
          d === null ||
          typeof d === "undefined" ||
          String(parseFloat(d)) === String(d)
        );
      },
      inspect(object, property) {
        const value = object[property];
        if (!this.nonNumeric.has(property)) {
          if (this.isNumeric(value)) {
            this.numeric.add(property);
          } else {
            this.nonNumeric.add(property);
            this.numeric.delete(property);
          }
        }
      },
    },

    replaceStringVariables(givenString, givenItem, variables) {
      let newString = givenString;
      for (let i = 0; i < variables.length; i++) {
        let variable = variables[i],
          variableText = "$" + variable;
        if (variable === "x") {
          variable = "fx";
        } else if (variable === "y") {
          variable = "fy";
        } else if (variable === "z") {
          variable = "fz";
        }
        let insertedText = String(givenItem[variable]);
        if (insertedText === "undefined") {
          insertedText = "";
        }
        newString = newString.replace(variableText, insertedText);
      }
      return newString;
    },

    parseGeneral(givenData, parsedData) {
      parsedData.general = {
        // General
        directed: state.manager.rawDataParser.getBool(
          givenData,
          "directed",
          true
        ),
        label: state.manager.rawDataParser.getString(givenData, "label", ""),
        background_color: state.manager.rawMetadataParser.getColor(
          givenData,
          "background_color",
          "white"
        ),
        arrow_color: state.manager.rawMetadataParser.getColor(
          givenData,
          "arrow_color",
          "black"
        ),
        arrow_size: state.manager.rawMetadataParser.getFinitePositiveNumber(
          givenData,
          "arrow_size",
          10.0
        ),
        // Nodes
        node_color: state.manager.rawMetadataParser.getColor(
          givenData,
          "node_color",
          "black"
        ),
        node_opacity: state.manager.rawMetadataParser.getFinitePositiveNumber(
          givenData,
          "node_opacity",
          1.0
        ),
        node_size: state.manager.rawMetadataParser.getFinitePositiveNumber(
          givenData,
          "node_size",
          10.0
        ),
        node_shape: state.manager.rawMetadataParser.getString(
          givenData,
          "node_shape",
          "circle"
        ),
        node_border_color: state.manager.rawMetadataParser.getColor(
          givenData,
          "node_border_color",
          "black"
        ),
        node_border_size:
          state.manager.rawMetadataParser.getFinitePositiveNumber(
            givenData,
            "node_border_size",
            0.0
          ),
        node_label_color: state.manager.rawMetadataParser.getColor(
          givenData,
          "node_label_color",
          "black"
        ),
        node_label_size:
          state.manager.rawMetadataParser.getFinitePositiveNumber(
            givenData,
            "node_label_size",
            12.0
          ),
        node_hover: state.manager.rawMetadataParser.getString(
          givenData,
          "node_hover",
          ""
        ),
        node_click: state.manager.rawMetadataParser.getString(
          givenData,
          "node_click",
          ""
        ),
        node_image: state.manager.rawMetadataParser.getString(
          givenData,
          "node_image",
          ""
        ),
        node_x: state.manager.rawMetadataParser.getFiniteNumberOrNull(
          givenData,
          "node_x",
          null
        ),
        node_y: state.manager.rawMetadataParser.getFiniteNumberOrNull(
          givenData,
          "node_y",
          null
        ),
        node_z: state.manager.rawMetadataParser.getFiniteNumberOrNull(
          givenData,
          "node_z",
          null
        ),
        contains_node_hover: false,
        contains_node_click: false,
        contains_node_image: false,
        // Edges
        edge_color: state.manager.rawMetadataParser.getColor(
          givenData,
          "edge_color",
          "black"
        ),
        edge_opacity: state.manager.rawMetadataParser.getFinitePositiveNumber(
          givenData,
          "edge_opacity",
          1.0
        ),
        edge_size: state.manager.rawMetadataParser.getFinitePositiveNumber(
          givenData,
          "edge_size",
          1.0
        ),
        edge_label_color: state.manager.rawMetadataParser.getColor(
          givenData,
          "edge_label_color",
          "black"
        ),
        edge_label_size:
          state.manager.rawMetadataParser.getFinitePositiveNumber(
            givenData,
            "edge_label_size",
            8.0
          ),
        edge_hover: state.manager.rawMetadataParser.getString(
          givenData,
          "edge_hover",
          ""
        ),
        edge_click: state.manager.rawMetadataParser.getString(
          givenData,
          "edge_click",
          ""
        ),
        contains_edge_hover: false,
        contains_edge_click: false,
      };
      if (!parsedData.general.directed) {
        parsedData.general.arrow_size = 0.0;
      }
    },

    parseNodes(givenData, parsedData) {
      const numNodes = state.manager.rawDataParser.getObjectLengthOrZero(
          givenData.nodes
        ),
        nodeIdToObjectMap = new Map(),
        nodeDefinedMetadata = new Set([
          "color",
          "opacity",
          "size",
          "shape",
          "border_color",
          "border_size",
          "label_color",
          "label_size",
          "hover",
          "click",
          "image",
          "x",
          "y",
        ]),
        nodeReplacementVariables = [
          "id",
          "label",
          "color",
          "opacity",
          "size",
          "shape",
          "border_color",
          "border_size",
          "label_color",
          "label_size",
          "image",
          "x",
          "y",
        ];
      state.manager.propertyClassifier.init();
      try {
        Object.entries(givenData.nodes);
      } catch (e) {
        givenData.nodes = {};
      }
      for (const [givenNodeId, givenNode] of Object.entries(givenData.nodes)) {
        const parsedNode = {};
        // data: id, label
        parsedNode.id = String(givenNodeId);
        parsedNode.label = state.manager.rawDataParser.getString(
          givenNode,
          "label",
          ""
        );
        // defined metadata
        parsedNode.color = state.manager.rawMetadataParser.getColor(
          givenNode,
          "color",
          parsedData.general.node_color
        );
        parsedNode.opacity =
          state.manager.rawMetadataParser.getFinitePositiveNumber(
            givenNode,
            "opacity",
            parsedData.general.node_opacity
          );
        parsedNode.size =
          state.manager.rawMetadataParser.getFinitePositiveNumber(
            givenNode,
            "size",
            parsedData.general.node_size
          );
        parsedNode.shape = state.manager.rawMetadataParser.getString(
          givenNode,
          "shape",
          parsedData.general.node_shape
        );
        parsedNode.border_color = state.manager.rawMetadataParser.getColor(
          givenNode,
          "border_color",
          parsedData.general.node_border_color
        );
        parsedNode.border_size =
          state.manager.rawMetadataParser.getFinitePositiveNumber(
            givenNode,
            "border_size",
            parsedData.general.node_border_size
          );
        parsedNode.label_color = state.manager.rawMetadataParser.getColor(
          givenNode,
          "label_color",
          parsedData.general.node_label_color
        );
        parsedNode.label_size =
          state.manager.rawMetadataParser.getFinitePositiveNumber(
            givenNode,
            "label_size",
            parsedData.general.node_label_size
          );
        const hover = state.manager.rawMetadataParser.getString(
          givenNode,
          "hover",
          parsedData.general.node_hover
        );
        const image = state.manager.rawMetadataParser.getString(
          givenNode,
          "image",
          parsedData.general.node_image
        );
        if (image !== "") {
          parsedNode.image = image;
          parsedData.general.contains_node_image = true;
        }
        if (hover !== "") {
          parsedNode.hover = hover;
          parsedData.general.contains_node_hover = true;
        }
        const click = state.manager.rawMetadataParser.getString(
          givenNode,
          "click",
          parsedData.general.node_click
        );
        if (click !== "") {
          parsedNode.click = click;
          parsedData.general.contains_node_click = true;
        }
        const x = state.manager.rawMetadataParser.getFiniteNumberOrNull(
          givenNode,
          "x",
          parsedData.general.node_x
        );
        const y = state.manager.rawMetadataParser.getFiniteNumberOrNull(
          givenNode,
          "y",
          parsedData.general.node_y
        );
        const z = state.manager.rawMetadataParser.getFiniteNumberOrNull(
          givenNode,
          "z",
          parsedData.general.node_z
        );
        if (x !== null) {
          parsedNode.fx = x;
        }
        if (y !== null) {
          parsedNode.fy = y;
        }
        if (z !== null) {
          parsedNode.fz = z;
        }
        // other metadata
        const otherMetadata =
          state.manager.rawMetadataParser.collectOtherMetadata(
            givenNode,
            parsedNode,
            nodeDefinedMetadata
          );
        // feature classification
        const parsedNodeProperties = Object.keys(parsedNode);
        for (let i = 0; i < parsedNodeProperties.length; i++) {
          const property = parsedNodeProperties[i],
            value = parsedNode[property];
          state.manager.propertyClassifier.inspect(parsedNode, property);
        }
        // variable replacements
        if (parsedNode.hover) {
          parsedNode.hover = state.manager.replaceStringVariables(
            parsedNode.hover,
            parsedNode,
            nodeReplacementVariables
          );
        }
        if (parsedNode.click) {
          parsedNode.click = state.manager.replaceStringVariables(
            parsedNode.click,
            parsedNode,
            nodeReplacementVariables.concat(["hover"])
          );
        }
        // store the parsed node
        parsedData.nodes.push(parsedNode);
        // data structure for inserting node object references into edge data
        nodeIdToObjectMap.set(parsedNode.id, parsedNode);
      }
      // Ensure numeric properties (except fx and fy) are stored as numbers and remember their extrema
      const numericProperties = Array.from(
          state.manager.propertyClassifier.numeric
        ).filter((name) => name !== "fx" && name !== "fy"),
        nonNumericProperties = Array.from(
          state.manager.propertyClassifier.nonNumeric
        ),
        minima = {},
        maxima = {};
      for (let i = 0; i < numNodes; i++) {
        const parsedNode = parsedData.nodes[i];
        for (let p = 0; p < numericProperties.length; p++) {
          const property = numericProperties[p],
            numericValue = parseFloat(parsedNode[property]);
          parsedNode[property] = numericValue;
          if (isFinite(numericValue)) {
            if (
              typeof minima[property] === "undefined" ||
              numericValue < minima[property]
            ) {
              minima[property] = numericValue;
            }
            if (
              typeof maxima[property] === "undefined" ||
              numericValue > maxima[property]
            ) {
              maxima[property] = numericValue;
            }
          }
        }
      }
      // Store feature classification and extrema
      parsedData.general.node_properties = {
        node_size_data_sources: numericProperties,
        node_label_text_data_sources:
          nonNumericProperties.concat(numericProperties),
        minima: minima,
        maxima: maxima,
      };
      // Report empty graph
      if (!(numNodes > 0)) {
        console.log(
          "Caution: Graph with 0 nodes. The provided data might be in the wrong format."
        );
      }
      return nodeIdToObjectMap;
    },

    parseEdges(givenData, parsedData, nodeIdToObjectMap) {
      let numEdges = state.manager.rawDataParser.getArrayLengthOrZero(
        givenData.edges
      );
      const knownEdgeIds = new Set(),
        ignoredEdges = [],
        edgeDefinedMetadata = new Set([
          "color",
          "opacity",
          "size",
          "label_color",
          "label_size",
          "hover",
          "click",
        ]),
        edgeReplacementVariables = [
          "id",
          "label",
          "color",
          "opacity",
          "size",
          "label_color",
          "label_size",
        ];
      state.manager.propertyClassifier.init();
      for (let i = 0; i < numEdges; i++) {
        const givenEdge = givenData.edges[i],
          parsedEdge = {},
          sourceId = String(givenEdge.source),
          targetId = String(givenEdge.target);
        // data: source, target, id, multi_edge_counter, label
        try {
          const sourceObj = nodeIdToObjectMap.get(sourceId);
          const targetObj = nodeIdToObjectMap.get(targetId);
          if (
            typeof sourceObj === "undefined" ||
            typeof targetObj === "undefined"
          ) {
            throw "Invalid node reference.";
          }
          parsedEdge.source = sourceObj;
          parsedEdge.target = targetObj;
        } catch (e) {
          const ignoredEdge = {
            index: i,
            source: sourceId,
            target: targetId,
          };
          ignoredEdges.push(ignoredEdge);
          continue;
        }
        const result = state.manager.rawDataParser.createUniqueEdgeId(
          sourceId,
          targetId,
          knownEdgeIds
        );
        parsedEdge.id = result.id;
        parsedEdge.multi_edge_counter = result.count;
        parsedEdge.label = state.manager.rawDataParser.getString(
          givenEdge,
          "label",
          ""
        );
        // defined metadata
        parsedEdge.color = state.manager.rawMetadataParser.getColor(
          givenEdge,
          "color",
          parsedData.general.edge_color
        );
        parsedEdge.opacity =
          state.manager.rawMetadataParser.getFinitePositiveNumber(
            givenEdge,
            "opacity",
            parsedData.general.edge_opacity
          );
        parsedEdge.size =
          state.manager.rawMetadataParser.getFinitePositiveNumber(
            givenEdge,
            "size",
            parsedData.general.edge_size
          );
        parsedEdge.label_color = state.manager.rawMetadataParser.getColor(
          givenEdge,
          "label_color",
          parsedData.general.edge_label_color
        );
        parsedEdge.label_size =
          state.manager.rawMetadataParser.getFinitePositiveNumber(
            givenEdge,
            "label_size",
            parsedData.general.edge_label_size
          );
        const hover = state.manager.rawMetadataParser.getString(
          givenEdge,
          "hover",
          parsedData.general.edge_hover
        );
        if (hover !== "") {
          parsedEdge.hover = hover;
          parsedData.general.contains_edge_hover = true;
        }
        const click = state.manager.rawMetadataParser.getString(
          givenEdge,
          "click",
          parsedData.general.edge_click
        );
        if (click !== "") {
          parsedEdge.click = click;
          parsedData.general.contains_edge_click = true;
        }
        // other metadata
        const otherMetadata =
          state.manager.rawMetadataParser.collectOtherMetadata(
            givenEdge,
            parsedEdge,
            edgeDefinedMetadata
          );
        // feature classification
        const parsedEdgeProperties = Object.keys(parsedEdge);
        for (let i = 0; i < parsedEdgeProperties.length; i++) {
          const property = parsedEdgeProperties[i],
            value = parsedEdge[property];
          state.manager.propertyClassifier.inspect(parsedEdge, property);
        }
        // variable replacements
        if (parsedEdge.hover) {
          parsedEdge.hover = state.manager.replaceStringVariables(
            parsedEdge.hover,
            parsedEdge,
            edgeReplacementVariables
          );
        }
        if (parsedEdge.click) {
          parsedEdge.click = state.manager.replaceStringVariables(
            parsedEdge.click,
            parsedEdge,
            edgeReplacementVariables.concat(["hover"])
          );
        }
        // store it
        parsedData.edges.push(parsedEdge);
      }
      // Ensure numeric properties are stored as numbers and remember their extrema
      const numericProperties = Array.from(
          state.manager.propertyClassifier.numeric
        ),
        nonNumericProperties = Array.from(
          state.manager.propertyClassifier.nonNumeric
        ),
        minima = {},
        maxima = {};
      numEdges = state.manager.rawDataParser.getArrayLengthOrZero(
        parsedData.edges
      );
      for (let i = 0; i < numEdges; i++) {
        const parsedEdge = parsedData.edges[i];
        for (let p = 0; p < numericProperties.length; p++) {
          const property = numericProperties[p],
            numericValue = parseFloat(parsedEdge[property]);
          parsedEdge[property] = numericValue;
          if (isFinite(numericValue)) {
            if (
              typeof minima[property] === "undefined" ||
              numericValue < minima[property]
            ) {
              minima[property] = numericValue;
            }
            if (
              typeof maxima[property] === "undefined" ||
              numericValue > maxima[property]
            ) {
              maxima[property] = numericValue;
            }
          }
        }
      }
      // Store feature classification and extrema
      parsedData.general.edge_properties = {
        edge_size_data_sources: numericProperties.filter(
          (item) => item !== "multi_edge_counter"
        ),
        edge_label_text_data_sources: nonNumericProperties
          .concat(numericProperties)
          .filter(
            (item) =>
              item !== "source" &&
              item !== "target" &&
              item !== "multi_edge_counter"
          ),
        minima: minima,
        maxima: maxima,
      };
      // Report invalid edges
      if (ignoredEdges.length > 0) {
        let message = undefined;
        if (ignoredEdges.length == 1) {
          message =
            "Caution: " +
            ignoredEdges.length +
            " edge was ignored because it " +
            "refers to a node that is not part of the node list:\n";
        } else {
          message =
            "Caution: " +
            ignoredEdges.length +
            " edges were ignored because they " +
            "refer to a node that is not part of the node list:\n";
        }
        for (let i = 0; i < ignoredEdges.length; i++) {
          const ignoredEdge = ignoredEdges[i];
          message += "- Edge with index " + ignoredEdge.index;
          message += ', source "' + ignoredEdge.source;
          message += '", target "' + ignoredEdge.target + '"\n';
          if (i == 9) {
            message += "...";
            break;
          }
        }
        console.log(message);
      }
    },

    parseChosenData(chosenGraphNumber) {
      let givenData = state.rawData[chosenGraphNumber],
        parsedData = {
          general: {},
          nodes: [],
          edges: [],
          adjacency: null,
          incidence: null,
        };
      if (!givenData || givenData === null) {
        givenData = [];
      }
      // a) General
      state.manager.parseGeneral(givenData, parsedData);
      // b) Nodes
      const nodeIdToObjectMap = state.manager.parseNodes(givenData, parsedData);
      // c) Edges
      state.manager.parseEdges(givenData, parsedData, nodeIdToObjectMap);
      // Update state
      state.parsedData = parsedData;
      // Full node metadata + edges for the XR tooltip panel (connections)
      window.aiwarGraph = parsedData;
      state.currentGraphParts = {};
      // Update UI: show or hide containers
      ui.elements.graphContainer.style.display =
        ui.convert.boolToDisplayStyle(true);
      ui.elements.detailsContainer.style.display =
        ui.convert.boolToDisplayStyle(state.showDetails);
      ui.elements.nodeImageMetaControl.style.display =
        ui.convert.boolToDisplayStyle(parsedData.general.contains_node_image);
    },

    // 3) Derive state.shownData from state.parsedData
    createNodeToAdjacentNodesMap() {
      const dataStructure = {
        map: new Map(),
        add(sourceNode, targetNode) {
          let adjacentNodes = this.map.get(sourceNode);
          if (adjacentNodes) {
            adjacentNodes.add(targetNode);
          } else {
            adjacentNodes = new Set([targetNode]);
            this.map.set(sourceNode, adjacentNodes);
          }
        },
      };
      return dataStructure;
    },

    createNodeToIncidentEdgesMap() {
      const dataStructure = {
        map: new Map(),
        add(node, edge) {
          let incidentEdges = this.map.get(node);
          if (incidentEdges) {
            incidentEdges.add(edge);
          } else {
            incidentEdges = new Set([edge]);
            this.map.set(node, incidentEdges);
          }
        },
      };
      return dataStructure;
    },

    prepareShownData() {
      const numNodes = state.parsedData.nodes.length,
        numEdges = state.parsedData.edges.length;
      state.shownData = {
        general: null,
        nodes: new Array(numNodes),
        edges: new Array(numEdges),
      };
      const nodeIdToObjectMap = new Map(),
        nodeSizeNormalizer = state.manager.createNodeSizeNormalizer();
      // a) General
      state.shownData.general = {
        background_color: state.parsedData.general.background_color,
        arrow_size: state.parsedData.general.arrow_size,
        arrow_color: state.parsedData.general.arrow_color,
        directed: state.parsedData.general.directed,
        node_image_fetching_failed: false,
      };
      // b) Nodes
      for (let i = 0; i < numNodes; i++) {
        state.shownData.nodes[i] = {};
        const parsedNode = state.parsedData.nodes[i],
          shownNode = state.shownData.nodes[i];
        shownNode.id = parsedNode.id;
        shownNode.label = state.manager.calcSingleNodeLabelText(parsedNode);
        shownNode.color = parsedNode.color;
        shownNode.opacity = parsedNode.opacity;
        shownNode.size = state.manager.calcSingleNodeSize(
          parsedNode,
          nodeSizeNormalizer
        );
        shownNode.shape = parsedNode.shape;
        shownNode.border_color = parsedNode.border_color;
        shownNode.border_size = parsedNode.border_size;
        shownNode.label_color = parsedNode.label_color;
        shownNode.label_size =
          state.manager.calcSingleNodeLabelSize(parsedNode);
        if (typeof parsedNode.image !== "undefined") {
          shownNode.image = parsedNode.image;
        }
        if (typeof parsedNode.hover !== "undefined") {
          shownNode.hover = parsedNode.hover;
        }
        if (typeof parsedNode.click !== "undefined") {
          shownNode.click = parsedNode.click;
        }
        if (typeof parsedNode.fx !== "undefined") {
          shownNode.fx = parsedNode.fx;
        }
        if (typeof parsedNode.fy !== "undefined") {
          shownNode.fy = parsedNode.fy;
        }
        if (typeof parsedNode.fz !== "undefined") {
          shownNode.fz = parsedNode.fz;
        }
        nodeIdToObjectMap.set(shownNode.id, shownNode);
        // Derived properties for performance improvement in updateNodePositions
        state.manager.calcSingleNodeSizeDerivatives(shownNode);
        state.manager.calcSingleNodeLabelSizeDerivatives(shownNode);
        state.manager.calcSingleNodeBorderSizeDerivatives(shownNode);
      }
      // c) Edges
      const edgeSizeNormalizer = state.manager.createEdgeSizeNormalizer(),
        nodeToAdjacentNodesMap = state.manager.createNodeToAdjacentNodesMap(),
        nodeToIncidentEdgesMap = state.manager.createNodeToIncidentEdgesMap();
      for (let i = 0; i < numEdges; i++) {
        state.shownData.edges[i] = {};
        const parsedEdge = state.parsedData.edges[i],
          shownEdge = state.shownData.edges[i];
        shownEdge.source = nodeIdToObjectMap.get(parsedEdge.source.id);
        shownEdge.target = nodeIdToObjectMap.get(parsedEdge.target.id);
        shownEdge.id = parsedEdge.id;
        shownEdge.label = state.manager.calcSingleEdgeLabelText(parsedEdge);
        shownEdge.color = parsedEdge.color;
        shownEdge.opacity = parsedEdge.opacity;
        shownEdge.size = state.manager.calcSingleEdgeSize(
          parsedEdge,
          edgeSizeNormalizer
        );
        shownEdge.label_color = parsedEdge.label_color;
        shownEdge.label_size =
          state.manager.calcSingleEdgeLabelSize(parsedEdge);
        shownEdge.multi_edge_counter = parsedEdge.multi_edge_counter;
        if (typeof parsedEdge.hover !== "undefined") {
          shownEdge.hover = parsedEdge.hover;
        }
        if (typeof parsedEdge.click !== "undefined") {
          shownEdge.click = parsedEdge.click;
        }
        // Derived properties for performance improvement in updateEdgePositions
        shownEdge.multi_edge_curvature_factor =
          state.manager.calcSingleEdgeCurvatureFactor(parsedEdge);
        // Data structure for highlighting adjacent nodes and incident edges to this node
        nodeToAdjacentNodesMap.add(shownEdge.source, shownEdge.target);
        nodeToAdjacentNodesMap.add(shownEdge.target, shownEdge.source);
        nodeToIncidentEdgesMap.add(shownEdge.source, shownEdge);
        nodeToIncidentEdgesMap.add(shownEdge.target, shownEdge);
      }
      state.shownData.adjacency = nodeToAdjacentNodesMap;
      state.shownData.incidence = nodeToIncidentEdgesMap;
    },

    calcSingleNodeSize(parsedNode, nodeSizeNormalizer) {
      let nodeSize = nodeSizeNormalizer(parsedNode[state.nodeSizeDataSource]);
      if (!isFinite(nodeSize)) {
        nodeSize = state.parsedData.general.node_size;
      }
      return nodeSize * state.nodeSizeFactor;
    },

    calcSingleNodeLabelText(parsedNode) {
      return String(parsedNode[state.nodeLabelTextDataSource]);
    },

    calcSingleNodeLabelSize(parsedNode) {
      return parsedNode.label_size * state.nodeLabelSizeFactor;
    },

    calcSingleNodeLabelPlacement(node) {
      let baseSize = node.size_half;
      if (state.showNodeImages && typeof node.image !== "undefined") {
        baseSize =
          node.size_half > node.image_size_half
            ? node.size_half
            : node.image_size_half;
      }
      return baseSize + node.label_size * 0.77 + 2.0;
    },

    calcSingleEdgeSize(parsedEdge, edgeSizeNormalizer) {
      let edgeSize = edgeSizeNormalizer(parsedEdge[state.edgeSizeDataSource]);
      if (!isFinite(edgeSize)) {
        edgeSize = state.parsedData.general.edge_size;
      }
      return edgeSize * state.edgeSizeFactor;
    },

    calcSingleEdgeCurvatureFactor(parsedEdge) {
      const appearanceAdaptionFactor = 0.6;
      return (
        state.edgeCurvature *
        parsedEdge.multi_edge_counter *
        appearanceAdaptionFactor
      );
    },

    calcSingleEdgeLabelText(parsedEdge) {
      return String(parsedEdge[state.edgeLabelTextDataSource]);
    },

    calcSingleEdgeLabelSize(parsedEdge) {
      return parsedEdge.label_size * state.edgeLabelSizeFactor;
    },

    calcSingleNodeSizeDerivatives(shownNode) {
      shownNode.size_half = shownNode.size / 2.0;
      const appearanceAdaptionFactor = 1.2;
      shownNode.image_size =
        shownNode.size * state.nodeImageSizeFactor * appearanceAdaptionFactor;
      shownNode.image_size_half = shownNode.image_size / 2.0;
      shownNode.relative_label_placement =
        state.manager.calcSingleNodeLabelPlacement(shownNode);
    },

    calcSingleNodeLabelSizeDerivatives(shownNode) {
      shownNode.relative_label_placement =
        state.manager.calcSingleNodeLabelPlacement(shownNode);
    },

    calcSingleNodeBorderSizeDerivatives(shownNode) {
      shownNode.border_size_half = shownNode.border_size / 2.0;
    },

    createNodeSizeNormalizer() {
      let normalizer;
      if (state.useNodeSizeNormalization) {
        const dataMin =
            state.parsedData.general.node_properties.minima[
              state.nodeSizeDataSource
            ],
          dataMax =
            state.parsedData.general.node_properties.maxima[
              state.nodeSizeDataSource
            ],
          targetMin = state.nodeSizeNormalizationMin,
          targetMax = state.nodeSizeNormalizationMax,
          dataDiff = dataMax - dataMin,
          targetDiff = targetMax - targetMin;
        let factor = targetDiff / dataDiff;
        if (!isFinite(factor) || factor === null) {
          factor = 0.0;
        }
        normalizer = function (val) {
          return (val - dataMin) * factor + targetMin;
        };
      } else {
        normalizer = function (val) {
          return val;
        };
      }
      return normalizer;
    },

    createEdgeSizeNormalizer() {
      let normalizer;
      if (state.useEdgeSizeNormalization) {
        const dataMin =
            state.parsedData.general.edge_properties.minima[
              state.edgeSizeDataSource
            ],
          dataMax =
            state.parsedData.general.edge_properties.maxima[
              state.edgeSizeDataSource
            ],
          targetMin = state.edgeSizeNormalizationMin,
          targetMax = state.edgeSizeNormalizationMax,
          dataDiff = dataMax - dataMin,
          targetDiff = targetMax - targetMin;
        let factor = targetDiff / dataDiff;
        if (!isFinite(factor)) {
          factor = 0.0;
        }
        normalizer = function (val) {
          return (val - dataMin) * factor + targetMin;
        };
      } else {
        normalizer = function (val) {
          return val;
        };
      }
      return normalizer;
    },

    updateNodeSizes() {
      // Data
      const nodeSizeNormalizer = state.manager.createNodeSizeNormalizer();
      for (let i = 0; i < state.parsedData.nodes.length; i++) {
        const parsedNode = state.parsedData.nodes[i],
          shownNode = state.shownData.nodes[i];
        shownNode.size = state.manager.calcSingleNodeSize(
          parsedNode,
          nodeSizeNormalizer
        );
        state.manager.calcSingleNodeSizeDerivatives(shownNode);
      }
      // UI
      ui.composites.graph.updateNodeSizes();
    },

    updateNodeImageSizes() {
      // Data
      for (let i = 0; i < state.parsedData.nodes.length; i++) {
        const parsedNode = state.parsedData.nodes[i],
          shownNode = state.shownData.nodes[i];
        state.manager.calcSingleNodeSizeDerivatives(shownNode);
      }
      // UI
      ui.composites.graph.updateNodeImages();
    },

    updateNodeLabelTexts() {
      // Data
      for (let i = 0; i < state.parsedData.nodes.length; i++) {
        const parsedNode = state.parsedData.nodes[i],
          shownNode = state.shownData.nodes[i];
        shownNode.label = state.manager.calcSingleNodeLabelText(parsedNode);
      }
      // UI
      ui.composites.graph.updateNodeLabels();
    },

    updateNodeLabelSizes() {
      // Data
      for (let i = 0; i < state.parsedData.nodes.length; i++) {
        const parsedNode = state.parsedData.nodes[i],
          shownNode = state.shownData.nodes[i];
        shownNode.label_size =
          state.manager.calcSingleNodeLabelSize(parsedNode);
        state.manager.calcSingleNodeLabelSizeDerivatives(shownNode);
      }
      // UI
      ui.composites.graph.updateNodeLabels();
    },

    updateEdgeSizes() {
      // Data
      const edgeSizeNormalizer = state.manager.createEdgeSizeNormalizer();
      for (let i = 0; i < state.parsedData.edges.length; i++) {
        const parsedEdge = state.parsedData.edges[i],
          shownEdge = state.shownData.edges[i];
        shownEdge.size = state.manager.calcSingleEdgeSize(
          parsedEdge,
          edgeSizeNormalizer
        );
      }
      // UI
      ui.composites.graph.updateEdgeSizes();
    },

    updateEdgeCurvatures() {
      // Data
      for (let i = 0; i < state.parsedData.edges.length; i++) {
        const parsedEdge = state.parsedData.edges[i],
          shownEdge = state.shownData.edges[i];
        shownEdge.multi_edge_curvature_factor =
          state.manager.calcSingleEdgeCurvatureFactor(parsedEdge);
      }
      // UI
      ui.composites.graph.updateEdgeCurvatures();
    },
  },
};

const ui = {
  symbols: {
    // Choice of symbols is influenced by their appearance in different browsers
    // Alternatives: "▼", "▽", "▾" / "▲", "△", "▴" / "▶", "▷", "▸" / "◀", "◁", "◂"
    // ▶ is rendered strangely on some mobile phone browsers, ▸ remains normal
    detailsShown: "▾",
    detailsHidden: "▴",
    menuShown: "▸",
    menuHidden: "◂",
    menuItemActive: "▸",
    menuItemInactive: "▾",
  },

  elements: {
    // Containers
    mainContainer: document.getElementById("iyMxMDy8nROxoE6xV-main-div"),
    tooltipContainer: document.getElementById("iyMxMDy8nROxoE6xV-tooltip-div"),
    leftContainer: document.getElementById("iyMxMDy8nROxoE6xV-left-div"),
    rightContainer: document.getElementById("iyMxMDy8nROxoE6xV-right-div"),
    graphContainer: document.getElementById("iyMxMDy8nROxoE6xV-graph-div"),
    detailsContainer: document.getElementById("iyMxMDy8nROxoE6xV-details-div"),
    detailsHead: document.getElementById("iyMxMDy8nROxoE6xV-details-head"),
    detailsBody: document.getElementById("iyMxMDy8nROxoE6xV-details-body"),
    // Data sources
    dataHead: document.getElementById("iyMxMDy8nROxoE6xV-data-head"),
    dataBody: document.getElementById("iyMxMDy8nROxoE6xV-data-body"),
    graphSelectionContainer: document.getElementById(
      "iyMxMDy8nROxoE6xV-graph-select-div"
    ),
    graphSelection: document.getElementById("iyMxMDy8nROxoE6xV-graph-select"),
    nodeSizeDataSourceSelect: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-size-data-source-select"
    ),
    nodeSizeNormalizationCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-size-normalization-checkbox"
    ),
    nodeSizeNormalizationContainer: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-size-norm-div"
    ),
    nodeSizeNormalizationMinText: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-size-normalization-min-text"
    ),
    nodeSizeNormalizationMinSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-size-normalization-min-slider"
    ),
    nodeSizeNormalizationMaxText: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-size-normalization-max-text"
    ),
    nodeSizeNormalizationMaxSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-size-normalization-max-slider"
    ),
    edgeSizeDataSourceSelect: document.getElementById(
      "iyMxMDy8nROxoE6xV-edge-size-data-source-select"
    ),
    edgeSizeNormalizationCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-edge-size-normalization-checkbox"
    ),
    edgeSizeNormalizationContainer: document.getElementById(
      "iyMxMDy8nROxoE6xV-edge-size-norm-div"
    ),
    edgeSizeNormalizationMinText: document.getElementById(
      "iyMxMDy8nROxoE6xV-edge-size-normalization-min-text"
    ),
    edgeSizeNormalizationMinSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-edge-size-normalization-min-slider"
    ),
    edgeSizeNormalizationMaxText: document.getElementById(
      "iyMxMDy8nROxoE6xV-edge-size-normalization-max-text"
    ),
    edgeSizeNormalizationMaxSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-edge-size-normalization-max-slider"
    ),
    // General
    generalHead: document.getElementById("iyMxMDy8nROxoE6xV-general-head"),
    generalBody: document.getElementById("iyMxMDy8nROxoE6xV-general-body"),
    resetButton: document.getElementById("iyMxMDy8nROxoE6xV-reset"),
    fullscreenButton: document.getElementById(
      "iyMxMDy8nROxoE6xV-fullscreen-button"
    ),
    svgExportButton: document.getElementById("iyMxMDy8nROxoE6xV-svg"),
    pngExportButton: document.getElementById("iyMxMDy8nROxoE6xV-png"),
    jpgExportButton: document.getElementById("iyMxMDy8nROxoE6xV-jpg"),
    // Nodes
    nodeHead: document.getElementById("iyMxMDy8nROxoE6xV-node-head"),
    nodeBody: document.getElementById("iyMxMDy8nROxoE6xV-node-body"),
    nodeCheckbox: document.getElementById("iyMxMDy8nROxoE6xV-node-checkbox"),
    nodeSizeFactorText: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-size-factor-text"
    ),
    nodeSizeFactorSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-size-factor-slider"
    ),
    nodeDragFixCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-drag-fix-checkbox"
    ),
    nodeHoverTooltipCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-hover-tooltip-checkbox"
    ),
    nodeReleaseButton: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-release-button"
    ),
    // Node images
    nodeImageHead: document.getElementById("iyMxMDy8nROxoE6xV-node-image-head"),
    nodeImageBody: document.getElementById("iyMxMDy8nROxoE6xV-node-image-body"),
    nodeImageCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-image-checkbox"
    ),
    nodeImageMetaControl: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-image-meta-control"
    ),
    nodeImageSizeFactorText: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-image-size-factor-text"
    ),
    nodeImageSizeFactorSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-image-size-factor-slider"
    ),
    // Node labels
    nodeLabelHead: document.getElementById("iyMxMDy8nROxoE6xV-node-label-head"),
    nodeLabelBody: document.getElementById("iyMxMDy8nROxoE6xV-node-label-body"),
    nodeLabelCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-label-checkbox"
    ),
    nodeLabelBorderCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-label-border-checkbox"
    ),
    nodeLabelTextDataSourceSelect: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-label-data-source-select"
    ),
    nodeLabelSizeFactorText: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-label-size-factor-text"
    ),
    nodeLabelSizeFactorSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-node-label-size-factor-slider"
    ),
    // Edges
    edgeHead: document.getElementById("iyMxMDy8nROxoE6xV-edge-head"),
    edgeBody: document.getElementById("iyMxMDy8nROxoE6xV-edge-body"),
    edgeCheckbox: document.getElementById("iyMxMDy8nROxoE6xV-edge-checkbox"),
    edgeSizeFactorText: document.getElementById(
      "iyMxMDy8nROxoE6xV-edge-size-factor-text"
    ),
    edgeSizeFactorSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-edge-size-factor-slider"
    ),
    edgeCurvatureText: document.getElementById(
      "iyMxMDy8nROxoE6xV-edge-curvature-text"
    ),
    edgeCurvatureSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-edge-curvature-slider"
    ),
    edgeHoverTooltipCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-edge-hover-tooltip-checkbox"
    ),
    // Layout algorithm
    layoutAlgorithmHead: document.getElementById(
      "iyMxMDy8nROxoE6xV-layout-algorithm-head"
    ),
    layoutAlgorithmBody: document.getElementById(
      "iyMxMDy8nROxoE6xV-layout-algorithm-body"
    ),
    simulationCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-simulation-active-checkbox"
    ),
    manyBodyForceCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-checkbox"
    ),
    manyBodyForceContainer: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-div"
    ),
    manyBodyForceStrengthText: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-strength-text"
    ),
    manyBodyForceStrengthSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-strength-slider"
    ),
    manyBodyForceThetaText: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-theta-text"
    ),
    manyBodyForceThetaSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-theta-slider"
    ),
    manyBodyForceMinDistCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-min-distance-checkbox"
    ),
    manyBodyForceMinDistContainer: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-min-distance-div"
    ),
    manyBodyForceMinDistText: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-min-distance-text"
    ),
    manyBodyForceMinDistSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-min-distance-slider"
    ),
    manyBodyForceMaxDistCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-max-distance-checkbox"
    ),
    manyBodyForceMaxDistContainer: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-max-distance-div"
    ),
    manyBodyForceMaxDistText: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-max-distance-text"
    ),
    manyBodyForceMaxDistSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-many-body-force-max-distance-slider"
    ),
    linksForceCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-links-force-checkbox"
    ),
    linksForceContainer: document.getElementById(
      "iyMxMDy8nROxoE6xV-links-force-div"
    ),
    linksForceDistanceText: document.getElementById(
      "iyMxMDy8nROxoE6xV-links-force-distance-text"
    ),
    linksForceDistanceSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-links-force-distance-slider"
    ),
    linksForceStrengthText: document.getElementById(
      "iyMxMDy8nROxoE6xV-links-force-strength-text"
    ),
    linksForceStrengthSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-links-force-strength-slider"
    ),
    xPositioningForceCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-x-positioning-force-checkbox"
    ),
    xPositioningForceContainer: document.getElementById(
      "iyMxMDy8nROxoE6xV-x-positioning-force-div"
    ),
    xPositioningForceStrengthText: document.getElementById(
      "iyMxMDy8nROxoE6xV-x-positioning-force-strength-text"
    ),
    xPositioningForceStrengthSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-x-positioning-force-strength-slider"
    ),
    yPositioningForceCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-y-positioning-force-checkbox"
    ),
    yPositioningForceContainer: document.getElementById(
      "iyMxMDy8nROxoE6xV-y-positioning-force-div"
    ),
    yPositioningForceStrengthText: document.getElementById(
      "iyMxMDy8nROxoE6xV-y-positioning-force-strength-text"
    ),
    yPositioningForceStrengthSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-y-positioning-force-strength-slider"
    ),
    zPositioningForceCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-z-positioning-force-checkbox"
    ),
    zPositioningForceContainer: document.getElementById(
      "iyMxMDy8nROxoE6xV-z-positioning-force-div"
    ),
    zPositioningForceStrengthText: document.getElementById(
      "iyMxMDy8nROxoE6xV-z-positioning-force-strength-text"
    ),
    zPositioningForceStrengthSlider: document.getElementById(
      "iyMxMDy8nROxoE6xV-z-positioning-force-strength-slider"
    ),
    centeringForceCheckbox: document.getElementById(
      "iyMxMDy8nROxoE6xV-centering-force-checkbox"
    ),
  },

  composites: {
    responsiveContainer: {
      init() {
        // Delete all contained items (relevant only for reset, not first creation)
        ui.deleteChildElements(ui.elements.graphContainer);
        ui.deleteChildElements(ui.elements.detailsBody);
        // Menu
        if (state.showMenu) {
          ui.composites.menu.show();
        } else {
          ui.composites.menu.hide();
        }
        // Details
        if (state.showDetails) {
          ui.composites.details.show(true);
        } else {
          ui.composites.details.hide(true);
        }
        // Divs
        ui.composites.responsiveContainer.setInnerHeights();
        ui.composites.responsiveContainer.setOuterHeights();
        ui.composites.responsiveContainer.getInnerWidths();
      },

      getInnerWidths() {
        state.graphContainerWidth = parseInt(
          ui.elements.graphContainer.clientWidth
        );
        state.detailsContainerWidth = parseInt(
          ui.elements.detailsContainer.clientWidth
        );
      },

      getInnerHeights() {
        state.graphContainerHeight = parseInt(
          ui.elements.graphContainer.clientHeight
        );
        if (state.showDetails) {
          state.detailsContainerHeight = parseInt(
            ui.elements.detailsContainer.clientHeight
          );
        }
      },

      setInnerHeights() {
        ui.elements.graphContainer.style.height =
          state.graphContainerHeight + "px";
        ui.elements.detailsContainer.style.height =
          state.detailsContainerHeight + "px";
      },

      setOuterHeights() {
        ui.elements.mainContainer.style.height =
          ui.elements.leftContainer.offsetHeight + "px";
      },

      getSizes() {
        ui.composites.responsiveContainer.getInnerWidths();
        ui.composites.responsiveContainer.getInnerHeights();
      },

      setSizes() {
        ui.composites.responsiveContainer.setInnerHeights();
        ui.composites.responsiveContainer.setOuterHeights();
      },

      adaptToResize() {
        ui.composites.responsiveContainer.getSizes();
        ui.composites.responsiveContainer.setSizes();
      },

      adaptToFullscreen() {
        ui.composites.responsiveContainer.getSizes();
        if (document.fullscreenElement) {
          // On entering fullscreen, remember the current container heights
          state.beforeFullscreenGraphContainerHeight =
            state.graphContainerHeight;
          state.beforeFullscreenDetailsContainerHeight =
            state.detailsContainerHeight;
          // and then adapt them to maximum height possible in full screen mode
          function calculateFullscreenMaxGraphHeight() {
            let outerHeight = null;
            try {
              const mainDivComputedStyle = window.getComputedStyle(
                  ui.elements.mainContainer
                ),
                graphDivComputedStyle = window.getComputedStyle(
                  ui.elements.graphContainer
                ),
                paddingTop = parseFloat(mainDivComputedStyle.paddingTop),
                borderTop = parseFloat(graphDivComputedStyle.borderTopWidth),
                borderBottom = parseFloat(
                  graphDivComputedStyle.borderBottomWidth
                ),
                paddingBottom = parseFloat(mainDivComputedStyle.paddingBottom);
              outerHeight =
                paddingTop + borderTop + borderBottom + paddingBottom;
              if (!isFinite(outerHeight) || outerHeight === null) {
                throw "Invalid number";
              }
            } catch (e) {
              // Hard coded fallback, depends on CSS of containers (1px borders, 6px padding)
              outerHeight = 1 + 3 + 3 + 1;
            }
            let graphHeight = screen.height - outerHeight;
            if (state.showDetails) {
              graphHeight -= ui.composites.details.calculateHeightDifference();
            }
            return graphHeight;
          }
          state.graphContainerHeight = calculateFullscreenMaxGraphHeight();
        } else {
          // On leaving fullscreen, set container heights back to remembered values
          state.graphContainerHeight =
            state.beforeFullscreenGraphContainerHeight;
          state.detailsContainerHeight =
            state.beforeFullscreenDetailsContainerHeight;
        }
        ui.composites.responsiveContainer.setSizes();
      },
    },

    menu: {
      show() {
        ui.elements.leftContainer.style.width = "80%";
        ui.elements.rightContainer.style.width = "20%";
        ui.elements.rightContainer.style.display = "block";
      },

      hide() {
        ui.elements.leftContainer.style.width = "100%";
        ui.elements.rightContainer.style.width = "0%";
        ui.elements.rightContainer.style.display = "none";
      },

      toggle() {
        // Update menu button
        const div = ui.elements.menuToggleDiv;
        state.showMenu = !state.showMenu;
        if (state.showMenu) {
          div.innerText = ui.symbols.menuShown;
          ui.composites.menu.show();
        } else {
          div.innerHTML = ui.symbols.menuHidden;
          ui.composites.menu.hide();
        }

        // Update rest of UI
        ui.composites.responsiveContainer.getInnerWidths();
        ui.composites.responsiveContainer.getInnerHeights();
        ui.composites.responsiveContainer.setOuterHeights();
        ui.composites.graph.updateGraphDrawingArea();
      },

      setItem(keyElement, valElement, toActive) {
        const currentText = keyElement.innerHTML;
        let sliceStart = 0;
        if (currentText.startsWith(ui.symbols.menuItemActive)) {
          sliceStart = ui.symbols.menuItemActive.length;
        } else if (currentText.startsWith(ui.symbols.menuItemInactive)) {
          sliceStart = ui.symbols.menuItemInactive.length;
        }
        if (toActive) {
          keyElement.innerHTML =
            ui.symbols.menuItemActive + currentText.slice(sliceStart);
          keyElement.style.backgroundColor = "#f5f5f5";
          keyElement.style.color = "black";
          keyElement.style.borderColor = "#999";
          keyElement.style.boxShadow = "0px 0px 3px rgba(0, 0, 0, 0.35)";
          valElement.style.display = "block";
        } else {
          keyElement.innerHTML =
            ui.symbols.menuItemInactive + currentText.slice(sliceStart);
          keyElement.style.backgroundColor = "white";
          keyElement.style.color = "#222";
          keyElement.style.borderColor = "#ccc";
          keyElement.style.boxShadow = "0px 0px 3px rgba(0, 0, 0, 0.2)";
          valElement.style.display = "none";
        }
      },

      toggleItem(keyElement, valElement) {
        const toActive = !(valElement.style.display !== "none");
        ui.composites.menu.setItem(keyElement, valElement, toActive);
      },
    },

    details: {
      calculateHeightDifference() {
        let outerHeight = null;
        try {
          const graphContainerComputedStyle = window.getComputedStyle(
              ui.elements.graphContainer
            ),
            detailsContainerComputedStyle = window.getComputedStyle(
              ui.elements.detailsContainer
            ),
            border1 = parseFloat(graphContainerComputedStyle.borderBottomWidth),
            margin = parseFloat(detailsContainerComputedStyle.marginTop),
            border2 = parseFloat(detailsContainerComputedStyle.borderTopWidth);
          outerHeight = border1 + margin + border2;
          if (!isFinite(outerHeight) || outerHeight === null) {
            throw "Invalid number";
          }
        } catch (e) {
          // Hard coded fallback, depends on CSS of containers (1px borders, 5px margin)
          outerHeight = 7.0;
        }
        return state.detailsContainerHeight + outerHeight;
      },

      show(init = false) {
        // Visibility
        ui.elements.detailsContainer.style.display = "block";
        if (!init) {
          // Height
          const heightDiff = ui.composites.details.calculateHeightDifference();
          state.graphContainerHeight -= heightDiff;
          if (state.graphContainerHeight < 70) {
            state.graphContainerHeight = 70;
          }
          // Update rest of UI
          ui.composites.responsiveContainer.setSizes();
          ui.composites.graph.updateGraphDrawingArea();
        }
      },

      hide(init = false) {
        // Visibility
        ui.elements.detailsContainer.style.display = "none";
        if (!init) {
          // Height
          const heightDiff = ui.composites.details.calculateHeightDifference();
          state.graphContainerHeight += heightDiff;
          // Update rest of UI
          ui.composites.responsiveContainer.setSizes();
          ui.composites.graph.updateGraphDrawingArea();
        }
      },

      toggle() {
        // Update details button
        const toggleDiv = ui.elements.detailsToggleDiv;
        state.showDetails = !state.showDetails;
        if (state.showDetails) {
          toggleDiv.innerText = ui.symbols.detailsShown;
          ui.composites.details.show();
        } else {
          toggleDiv.innerHTML = ui.symbols.detailsHidden;
          ui.composites.details.hide();
        }
      },
    },

    download: {
      png(filename) {
        ui.composites.download._rasterImage(filename, "png");
      },

      jpg(filename) {
        ui.composites.download._rasterImage(filename, "jpeg");
      },

      _rasterImage(filename, format, resolutionFactor = 4.0) {
        const renderer = state.webglGraph.renderer(),
          scene = window.experience.scene,
          camera = state.webglGraph.camera(),
          mimeType = "image/" + format,
          size = new THREE.Vector2(0, 0);

        renderer.getSize(size);
        const width = size.x,
          height = size.y;

        function upsize() {
          renderer.setSize(width * resolutionFactor, height * resolutionFactor);
          renderer.render(scene, camera);
        }
        function downsize() {
          renderer.setSize(width, height);
          renderer.render(scene, camera);
        }
        // Increase resolution
        upsize();
        // Create image and decrease solution to original value
        function finishedBlobCallback(blob) {
          ui.composites.download._blobToFileDownload(blob, filename);
          downsize();
        }
        renderer.domElement.toBlob(finishedBlobCallback, mimeType, 1.0);
      },

      _blobToFileDownload(blob, filename) {
        const url = URL.createObjectURL(blob),
          a = document.createElement("a");
        function handleClick() {
          setTimeout(function () {
            // Long waiting time before removal for slow devices like mobile phones
            URL.revokeObjectURL(url);
            this.removeEventListener("click", handleClick);
          }, 20000);
        }
        document.body.appendChild(a);
        a.href = url;
        a.download = filename;
        a.addEventListener("click", handleClick, false);
        a.click();
        document.body.removeChild(a);
      },
    },

    selection(element, optionList, valueList = undefined) {
      while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
      }
      for (let i = 0; i < optionList.length; i++) {
        let text = optionList[i];
        let value = text;
        if (valueList) {
          value = valueList[i];
        }
        let opt = document.createElement("option");
        opt.appendChild(document.createTextNode(text));
        opt.value = value;
        element.appendChild(opt);
      }
    },

    tooltip: {
      show(xShift = null, yShift = null) {
        if (isFinite(xShift) && xShift !== null) {
          ui.elements.tooltipContainer.style.left = parseInt(xShift) + "px";
        }
        if (isFinite(yShift) && yShift !== null) {
          ui.elements.tooltipContainer.style.top = parseInt(yShift) + "px";
        }
        ui.elements.tooltipContainer.style.transition =
          "visibility 0s, opacity 0.1s";
        ui.elements.tooltipContainer.style.visibility = "visible";
        ui.elements.tooltipContainer.style.opacity = 1.0;
      },

      hide() {
        ui.elements.tooltipContainer.style.transition =
          "visibility 0.3s, opacity 0.3s ease-in";
        ui.elements.tooltipContainer.style.visibility = "hidden";
        ui.elements.tooltipContainer.style.opacity = 0.0;
      },
    },

    progressBar: {
      create() {
        // Main container
        this.mainContainer = document.createElement("div");
        this.mainContainer.id = "iyMxMDy8nROxoE6xV-progress-container";
        this.mainContainer.style.backgroundColor =
          state.shownData.general.background_color;
        ui.elements.graphContainer.style.backgroundColor =
          state.shownData.general.background_color;
        // Text container
        const numNodes = state.parsedData.nodes.length;
        this.textContainer = document.createElement("div");
        this.textContainer.innerText =
          "Large graph with " +
          numNodes +
          " nodes. Calculating an initial layout before visualizing it.";
        this.textContainer.style.textAlign = "center";
        // Bar container
        this.outerBarContainer = document.createElement("div");
        this.outerBarContainer.style.border = "1px solid black";
        this.outerBarContainer.style.borderRadius = "4px";
        this.outerBarContainer.style.marginTop = "1ex";
        this.outerBarContainer.style.padding = "1px";
        this.innerBarContainer = document.createElement("div");
        this.innerBarContainer.style.backgroundColor = "black";
        this.innerBarContainer.style.width = "0%";
        this.innerBarContainer.style.height = "8px";
        this.innerBarContainer.style.borderRadius = "3px";
        // Add them to DOM
        this.outerBarContainer.appendChild(this.innerBarContainer);
        this.mainContainer.appendChild(this.textContainer);
        // this.mainContainer.appendChild(this.outerBarContainer);  // Hide bar (not updated)
        ui.elements.graphContainer.appendChild(this.mainContainer);
      },

      update(percentage) {
        this.innerBarContainer.style.width = percentage + "%";
      },

      remove() {
        ui.elements.graphContainer.removeChild(this.mainContainer);
      },
    },

    graph: {
      createGraph() {
        // Remove existing elements
        ui.deleteChildElements(ui.elements.graphContainer);

        // - Graph (create without DOM container to extract Three.js objects)
        const tempDiv = document.createElement("div");
        tempDiv.style.position = "absolute";
        tempDiv.style.top = "-9999px";
        document.body.appendChild(tempDiv);

        state.webglGraph = ForceGraph3D()(tempDiv)
          .showNavInfo(false)
          .backgroundColor(state.shownData.general.background_color)
          .width(state.graphContainerWidth)
          .height(state.graphContainerHeight);
        setTimeout(() => {
          const graphScene = state.webglGraph.scene();
          if (graphScene && scene) {
            // Create a group to hold the network in the Experience scene
            const networkGroup = new THREE.Group();
            networkGroup.name = "NetworkVisualization";

            // Copy all objects from ForceGraph scene to our group
            const objectsToMove = [...graphScene.children];
            objectsToMove.forEach((child) => {
              if (child) {
                graphScene.remove(child);
                networkGroup.add(child);
              }
            });

            // Position and scale the network appropriately for VR
            networkGroup.position.set(0, 1.5, -2); // In front of user
            networkGroup.scale.set(0.01, 0.01, 0.01); // Scale down

            // Add to Experience scene and store global reference
            scene.add(networkGroup);
            window.networkGroup = networkGroup; // Store reference for World access

            console.log("Network added to Experience scene");
          }

          // Clean up temporary DOM element
          document.body.removeChild(tempDiv);
        }, 1000);

        // Attempt to prevent some memory leaks
        const renderer = state.webglGraph.renderer();
        state.threeObjects.trackRenderer("currentGraph", renderer);
        const renderTarget = renderer.getRenderTarget();
        state.threeObjects.trackRenderTarget(
          "currentRenderTarget",
          renderTarget
        );
        // - Menu toggle button
        if (state.showMenuToggleButton) {
          const menuDiv = document.createElement("div");
          if (state.showMenu) {
            menuDiv.innerText = ui.symbols.menuShown;
          } else {
            menuDiv.innerText = ui.symbols.menuHidden;
          }
          menuDiv.id = "iyMxMDy8nROxoE6xV-menu-toggle-button";
          menuDiv.onclick = ui.composites.menu.toggle;
          ui.elements.graphContainer.appendChild(menuDiv);
          ui.elements.menuToggleDiv = menuDiv;
        }
        // - Details toggle button
        if (state.showDetailsToggleButton) {
          const detailsDiv = document.createElement("div");
          if (state.showDetails) {
            detailsDiv.innerText = ui.symbols.detailsShown;
          } else {
            detailsDiv.innerText = ui.symbols.detailsHidden;
          }
          detailsDiv.id = "iyMxMDy8nROxoE6xV-details-toggle-button";
          detailsDiv.onclick = ui.composites.details.toggle;
          ui.elements.graphContainer.appendChild(detailsDiv);
          ui.elements.detailsToggleDiv = detailsDiv;
        }
        // Wait a bit to finish UI rendering, then start potentially slow layout computation
        setTimeout(function () {
          // - Layout algorithm
          ui.composites.graph.setLayout();
          // - Data
          const data = {
            nodes: state.shownData.nodes,
            links: state.shownData.edges,
          };
          state.webglGraph.graphData(data);
          // - Nodes
          state.webglGraph
            .nodeThreeObject(ui.composites.graph.createSingleNodeObject)
            .nodeVisibility(state.showNodes);
          // - Edges
          // Uses linkMaterial because linkOpacity can only be a single number, not function
          state.webglGraph
            .linkVisibility(state.showEdges)
            .linkWidth((edge) => edge.size)
            .linkCurvature(ui.composites.graph._calcEdgeCurvature)
            .linkMaterial(ui.composites.graph.createSingleEdgeMaterial);
          if (state.shownData.general.directed) {
            state.webglGraph
              .linkDirectionalArrowColor(
                (edge) => state.shownData.general.arrow_color
              )
              .linkDirectionalArrowLength(
                (edge) => state.shownData.general.arrow_size
              )
              .linkDirectionalArrowRelPos(
                ui.composites.graph._calcArrowPosition
              );
          }
          // - Graph behavior
          ui.composites.graph.setBehavior();
        }, 250);
      },

      _calcArrowPosition(edge) {
        if (edge.source === edge.target) {
          // Case 1: Self loop
          return 0.5;
        } else {
          // Case 2: Normal edge
          const dx = edge.target.x - edge.source.x,
            dy = edge.target.y - edge.source.y,
            dz = edge.target.z - edge.source.z,
            len = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
          return 0.99 - edge.target.size_half / len;
        }
      },

      setLayout() {
        // Store all forces provided by the library (for reuse when turning them off)
        state.predefinedForces = {
          charge: state.webglGraph.d3Force("charge"),
          link: state.webglGraph.d3Force("link"),
          center: state.webglGraph.d3Force("center"),
        };
        ui.composites.graph.simulationManager.setAllForces();
        state.webglGraph.d3VelocityDecay(0.3); // default 0.4, lower value means less friction

        // - Progress bar: only if large graph, stops simulation to get initial static image
        const numNodes = state.parsedData.nodes.length;
        if (numNodes > state.largeGraphThreshold) {
          // Layout start
          ui.composites.progressBar.create();
          let numIterations = 40;
          if (numNodes >= 25000) {
            numIterations = 9;
          } else if (numNodes >= 10000) {
            numIterations = 13;
          } else if (numNodes >= 5000) {
            numIterations = 18;
          } else if (numNodes >= 2000) {
            numIterations = 25;
          } else if (numNodes >= 1000) {
            numIterations = 35;
          }
          // Layout update
          state.webglGraph.warmupTicks(numIterations);
          // Layout finished
          state.webglGraph
            .onEngineTick(function () {
              // Freeze graph after warmup to get a static rendering
              state.webglGraph.cooldownTicks(0);
              // Remove progress message
              ui.composites.progressBar.remove();
            })
            .onEngineStop(function () {
              // Remove tick functions
              state.webglGraph.onEngineTick(function () {});
              state.webglGraph.onEngineStop(function () {});
              // Unfreeze graph for future user interaction
              state.webglGraph.cooldownTicks(Infinity);
            });
        }
      },

      setBehavior() {
        // - Node click behavior
        function createNodeText(node) {
          let htmlText = "<div>Node: " + String(node.id) + "</div>";
          if (typeof node.click !== "undefined" && node.click !== "") {
            htmlText +=
              '<div id="iyMxMDy8nROxoE6xV-details-user-provided">' +
              node.click +
              "</div>";
          }
          return htmlText;
        }
        state.webglGraph.onNodeClick(function (node) {
          try {
            ui.elements.detailsBody.innerHTML = createNodeText(node);
          } catch (e) {}
        });
        // - Node drag behavior
        state.webglGraph.onNodeDragEnd(function (node) {
          if (state.nodeDragFix) {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          } else {
            node.fx = null;
            node.fy = null;
            node.fz = null;
          }
        });
        // - Edge click behavior
        function createEdgeText(edge) {
          let htmlText = "<div>Edge: " + String(edge.id) + "</div>";
          if (typeof edge.click !== "undefined" && edge.click !== "") {
            htmlText +=
              '<div id="iyMxMDy8nROxoE6xV-details-user-provided">' +
              edge.click +
              "</div>";
          }
          return htmlText;
        }
        state.webglGraph.onLinkClick(function (edge) {
          try {
            ui.elements.detailsBody.innerHTML = createEdgeText(edge);
          } catch (e) {}
        });
        // - Hover behavior
        document.addEventListener("mousemove", function (event) {
          // Hack to get mouse position in hover event handler
          // https://stackoverflow.com/questions/2601097/how-to-get-the-mouse-position-without-events-without-moving-the-mouse
          state.cursorX = event.clientX;
          state.cursorY = event.clientY;
        });
        function calculateRelativePosition() {
          const cont = ui.elements.mainContainer,
            contAbsX = cont.offsetLeft,
            contAbsY = cont.offsetTop,
            contBoundingRect = cont.getBoundingClientRect(),
            contClientX = contBoundingRect.left,
            contClientY = contBoundingRect.top,
            contWidth = contBoundingRect.width;
          let deltaX = state.cursorX - contClientX,
            deltaY = state.cursorY - contClientY,
            deltaXMax = contWidth * 0.85;
          if (deltaX > deltaXMax) {
            deltaX = deltaXMax;
          }
          const xShift = contAbsX + deltaX + 7,
            yShift = contAbsY + deltaY + 14;
          return { xShift: xShift, yShift: yShift };
        }
        // - Node hover behavior
        state.webglGraph.onNodeHover(function (node) {
          if (node !== null) {
            if (typeof node.hover !== "undefined") {
              if (state.nodeHoverTooltip) {
                const relPos = calculateRelativePosition();
                ui.elements.tooltipContainer.innerHTML = node.hover;
                ui.composites.tooltip.show(relPos.xShift, relPos.yShift);
              }
            }
          } else {
            ui.composites.tooltip.hide();
          }
        });
        // - Edge hover behavior
        state.webglGraph.onLinkHover(function (edge) {
          if (edge !== null) {
            if (typeof edge.hover !== "undefined") {
              if (state.edgeHoverTooltip) {
                const relPos = calculateRelativePosition();
                ui.elements.tooltipContainer.innerHTML = edge.hover;
                ui.composites.tooltip.show(relPos.xShift, relPos.yShift);
              }
            }
          } else {
            ui.composites.tooltip.hide();
          }
        });
      },

      updateGraphDrawingArea() {
        state.webglGraph
          .width(state.graphContainerWidth)
          .height(state.graphContainerHeight);
      },

      // Nodes
      createSingleNodeObject(node) {
        let obj = null;
        // Object creator functions
        function createGeometicObject(
          id,
          shape,
          size,
          sizeHalf,
          color,
          opacity
        ) {
          const material = new THREE.MeshLambertMaterial({
            color: color,
            opacity: opacity,
            transparent: true,
            depthWrite: true,
          });
          state.threeObjects.trackMaterial(id, material);
          let geometry = null;
          if (shape == "rectangle") {
            geometry = new THREE.BoxGeometry(size, size, size); // width, height, depth
          } else if (shape == "hexagon") {
            geometry = new THREE.IcosahedronGeometry(sizeHalf); // radius
          } else {
            geometry = new THREE.SphereGeometry(sizeHalf, 16, 12); // radius, widthSegments, heightSegments
          }
          state.threeObjects.trackGeometry(id, geometry);
          obj = new THREE.Mesh(geometry, material);
          return obj;
        }
        function createImageObject(id, image, size) {
          const material = new THREE.MeshBasicMaterial({
            transparent: true,
            depthWrite: false,
            opacity: 0.0,
          });
          const geometry = new THREE.SphereGeometry(size);
          obj = new THREE.Mesh(geometry, material);
          state.threeObjects.trackGeometry(id, geometry);
          state.threeObjects.trackMaterial(id, material);
          function onTextureLoad(texture) {
            const width = texture.image.width,
              height = texture.image.height,
              factor1 = width / size,
              factor2 = height / size,
              largerFactor = factor1 > factor2 ? factor1 : factor2;
            const imageMaterial = new THREE.MeshBasicMaterial({
              map: imageTexture,
              transparent: true,
              depthWrite: false,
              side: THREE.DoubleSide,
            });
            state.threeObjects.trackMaterial(id + "image", imageMaterial);
            const planeWidth = width / largerFactor;
            const planeHeight = height / largerFactor;
            const planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight);
            state.threeObjects.trackGeometry(id + "imagePlane", planeGeo);
            const imageBillboard = new THREE.Mesh(planeGeo, imageMaterial);
            imageBillboard.onBeforeRender = yBillboardOnBeforeRender;
            obj.add(imageBillboard);
          }
          const imageTexture = new THREE.TextureLoader().load(
            image,
            onTextureLoad
          );
          state.threeObjects.trackTexture(id, imageTexture);
          imageTexture.minFilter = THREE.LinearFilter;
          return obj;
        }
        function createTextSpriteObject(
          id,
          text,
          fontSize,
          fontColor,
          fontBorderColor,
          fontName
        ) {
          // Parameter processing
          fontSize = fontSize * 10;
          const fontStyle = fontSize + "px " + fontName;
          // Canvas preparation: appropriate size for given text and text style
          const canvas = document.createElement("canvas"),
            context = canvas.getContext("2d");
          context.font = fontStyle;
          const exactWidth = context.measureText(text).width,
            approxHeight = context.measureText("M").width * 2.0;
          canvas.width = exactWidth;
          canvas.height = approxHeight;
          context.font = fontStyle;
          // Text to canvas
          if (state.showNodeLabelBorders) {
            context.lineWidth = 6;
            context.strokeStyle = fontBorderColor;
            context.strokeText(text, 0, fontSize);
          }
          context.fillStyle = fontColor;
          context.fillText(text, 0, fontSize);
          // Canvas to plane mesh (Y-axis billboard)
          const texture = new THREE.Texture(canvas);
          state.threeObjects.trackTexture(id + "text", texture);
          texture.minFilter = THREE.LinearFilter;
          texture.needsUpdate = true;
          const planeMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
          });
          state.threeObjects.trackMaterial(id + "text", planeMaterial);
          const sizeCorrectionFactor = 0.1;
          const planeWidth = exactWidth * sizeCorrectionFactor;
          const planeHeight = approxHeight * sizeCorrectionFactor;
          const planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight);
          state.threeObjects.trackGeometry(id + "textPlane", planeGeo);
          const labelBillboard = new THREE.Mesh(planeGeo, planeMaterial);
          labelBillboard.onBeforeRender = yBillboardOnBeforeRender;
          return labelBillboard;
        }
        // Parent object: Image or geometric object
        if (state.showNodeImages && typeof node.image !== "undefined") {
          obj = createImageObject(node.id, node.image, node.image_size);
        } else {
          obj = createGeometicObject(
            node.id,
            node.shape,
            node.size,
            node.size_half,
            node.color,
            node.opacity
          );
        }
        obj.userData.networkNode = true;
        obj.userData.nodeId = node.id;
        // shownData nodes only keep visual properties; the parsed node carries
        // the flattened metadata (name, year, militaryUse, ...) consumed by
        // the XR tooltip panel.
        const parsedNode =
          state.parsedData?.nodes?.find((n) => n.id === node.id) || null;
        obj.userData.nodeName = parsedNode?.name || node.label || node.id;
        obj.userData.nodeData = parsedNode;
        // Child object: Text sprite (optional)
        if (state.showNodeLabels && node.label !== "") {
          const sprite = createTextSpriteObject(
            node.id,
            node.label,
            node.label_size,
            node.label_color,
            state.shownData.general.background_color,
            state.nodeLabelFont
          );
          let dx = 0,
            dy = -node.relative_label_placement,
            dz = 0;
          sprite.position.set(dx, dy, dz);
          obj.add(sprite);
        }
        return obj;
      },

      updateNodeVisibilities() {
        state.webglGraph.nodeVisibility(state.showNodes);
      },

      updateNodeSizes() {
        state.webglGraph.nodeThreeObject(
          ui.composites.graph.createSingleNodeObject
        );
      },

      // Node images
      updateNodeImages() {
        state.webglGraph.nodeThreeObject(
          ui.composites.graph.createSingleNodeObject
        );
      },

      // Node labels
      updateNodeLabels() {
        state.webglGraph.nodeThreeObject(
          ui.composites.graph.createSingleNodeObject
        );
      },

      // Edges
      createSingleEdgeMaterial(edge) {
        const material = new THREE.MeshLambertMaterial({
          color: edge.color,
          opacity: edge.opacity,
          transparent: true,
          depthWrite: true,
        });
        return material;
      },

      updateEdgeVisibilities() {
        state.webglGraph.linkVisibility(state.showEdges);
      },

      updateEdgeSizes() {
        state.webglGraph.linkWidth((edge) => edge.size);
      },

      _calcEdgeCurvature(edge) {
        if (edge.source === edge.target) {
          return ui.composites.graph._calcSelfLoopCurvature(edge);
        } else {
          return ui.composites.graph._calcNormalEdgeCurvature(edge);
        }
      },

      _calcNormalEdgeCurvature(edge) {
        return edge.multi_edge_curvature_factor;
      },

      _calcSelfLoopCurvature(edge) {
        return (
          edge.source.size / 50.0 +
          edge.multi_edge_counter / 4.0 +
          Math.abs(edge.multi_edge_curvature_factor)
        );
      },

      updateEdgeCurvatures() {
        state.webglGraph
          .linkCurvature(ui.composites.graph._calcEdgeCurvature)
          .linkVisibility(state.showEdges); // causes a redraw, relevant if graph has stabilized
      },

      // Layout algorithm
      simulationManager: {
        move() {
          if (state.layoutAlgorithmActive) {
            state.webglGraph.d3ReheatSimulation();
          }
        },
        restart() {
          state.webglGraph.cooldownTicks(Infinity);
          this.setAllForces();
          this.move();
        },
        stop() {
          state.webglGraph.cooldownTicks(0);
          this.removeAllForces();
        },
        releaseFixedNodes() {
          const nodes = state.shownData.nodes;
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            node.fx = null;
            node.fy = null;
            node.fz = null;
          }
        },
        setAllForces() {
          this.setCenteringForce();
          this.setLinksForce();
          this.setManyBodyForce();
          this.setXPositioningForce();
          this.setYPositioningForce();
          this.setZPositioningForce();
        },
        removeAllForces() {
          state.webglGraph.d3Force("center", null);
          state.webglGraph.d3Force("link", null);
          state.webglGraph.d3Force("charge", null);
          state.webglGraph.d3Force("x-positioning", null);
          state.webglGraph.d3Force("y-positioning", null);
          state.webglGraph.d3Force("z-positioning", null);
        },
        setCenteringForce() {
          let centeringForce = null;
          if (state.useCenteringForce && state.layoutAlgorithmActive) {
            centeringForce = state.predefinedForces.center.x(0.0).y(0.0);
          }
          state.webglGraph.d3Force("center", centeringForce);
        },
        setLinksForce() {
          let linksForce = null;
          if (state.useLinksForce && state.layoutAlgorithmActive) {
            const nodes = state.shownData.nodes,
              edges = state.shownData.edges;
            if (!state.shownData.edgeCounts) {
              const count = {};
              for (let i = 0; i < edges.length; i++) {
                const edge = edges[i];
                count[edge.source.id] = (count[edge.source.id] || 0) + 1;
                count[edge.target.id] = (count[edge.target.id] || 0) + 1;
              }
              state.shownData.edgeCounts = count;
            }
            const appearanceAdaptionFactor = 2.0;
            linksForce = state.predefinedForces.link
              .distance(state.linksForceDistance * appearanceAdaptionFactor)
              .strength(function (d) {
                // Adapted from https://github.com/d3/d3-force/blob/master/src/link.js
                const fixedConnectivity = Math.min(
                  state.shownData.edgeCounts[d.source.id],
                  state.shownData.edgeCounts[d.target.id]
                );
                const adjustableStrength = 2.0 * state.linksForceStrength;
                return adjustableStrength / fixedConnectivity;
              });
          }
          state.webglGraph.d3Force("link", linksForce);
        },
        setManyBodyForce() {
          let manyBodyForce = null;
          if (state.useManyBodyForce && state.layoutAlgorithmActive) {
            manyBodyForce = state.predefinedForces.charge
              .strength(state.manyBodyForceStrength)
              .theta(state.manyBodyForceTheta);
            if (state.useManyBodyForceMinDistance) {
              manyBodyForce.distanceMin(state.manyBodyForceMinDistance);
            } else {
              manyBodyForce.distanceMin(0.0);
            }
            if (state.useManyBodyForceMaxDistance) {
              manyBodyForce.distanceMax(state.manyBodyForceMaxDistance);
            } else {
              manyBodyForce.distanceMax(Infinity);
            }
          }
          state.webglGraph.d3Force("charge", manyBodyForce);
        },
        setXPositioningForce() {
          let xPositioningForce = null;
          if (state.useXPositioningForce && state.layoutAlgorithmActive) {
            function userDefinedForce(alpha) {
              const nodes = state.shownData.nodes;
              for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                node.vx +=
                  (0.0 - node.x) * alpha * state.xPositioningForceStrength;
              }
            }
            xPositioningForce = userDefinedForce;
          }
          state.webglGraph.d3Force("x-positioning", xPositioningForce);
        },
        setYPositioningForce() {
          let yPositioningForce = null;
          if (state.useYPositioningForce && state.layoutAlgorithmActive) {
            function userDefinedForce(alpha) {
              const nodes = state.shownData.nodes;
              for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                node.vy +=
                  (0.0 - node.y) * alpha * state.yPositioningForceStrength;
              }
            }
            yPositioningForce = userDefinedForce;
          }
          state.webglGraph.d3Force("y-positioning", yPositioningForce);
        },
        setZPositioningForce() {
          let zPositioningForce = null;
          if (state.useZPositioningForce && state.layoutAlgorithmActive) {
            function userDefinedForce(alpha) {
              const nodes = state.shownData.nodes;
              for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                node.vz +=
                  (0.0 - node.z) * alpha * state.zPositioningForceStrength;
              }
            }
            zPositioningForce = userDefinedForce;
          }
          state.webglGraph.d3Force("z-positioning", zPositioningForce);
        },
      },
    },
  },

  init() {
    // Containers
    ui.composites.responsiveContainer.init();
    // Graph selection (only visible if multiple graphs in data)
    if (state.rawData.length > 1) {
      ui.elements.graphSelectionContainer.style.display =
        ui.convert.boolToDisplayStyle(true);
      const optionList = [],
        valueList = [];
      let label;
      for (let i = 0; i < state.rawData.length; i++) {
        const graph = state.rawData[i];
        try {
          label = String(graph.label);
          if (label === "undefined" || label === "") {
            throw "Invalid label";
          }
        } catch (e) {
          label = "Unnamed graph";
        }
        const name = String(i + 1) + ": " + label;
        optionList.push(name);
        valueList.push(String(i));
      }
      ui.composites.selection(
        ui.elements.graphSelection,
        optionList,
        valueList
      );
    }
    // General (menu item)
    ui.composites.menu.setItem(
      ui.elements.generalHead,
      ui.elements.generalBody,
      true
    );
    // Data selection (menu item)
    ui.composites.menu.setItem(
      ui.elements.dataHead,
      ui.elements.dataBody,
      false
    );
    // - Node size
    ui.elements.nodeSizeNormalizationCheckbox.checked =
      state.useNodeSizeNormalization;
    ui.elements.nodeSizeNormalizationContainer.style.display =
      ui.convert.boolToDisplayStyle(state.useNodeSizeNormalization);
    ui.elements.nodeSizeNormalizationMinText.innerHTML =
      ui.convert.numberToText(state.nodeSizeNormalizationMin);
    ui.elements.nodeSizeNormalizationMinSlider.value =
      state.nodeSizeNormalizationMin;
    ui.elements.nodeSizeNormalizationMaxText.innerHTML =
      ui.convert.numberToText(state.nodeSizeNormalizationMax);
    ui.elements.nodeSizeNormalizationMaxSlider.value =
      state.nodeSizeNormalizationMax;
    // - Edge size
    ui.elements.edgeSizeNormalizationCheckbox.checked =
      state.useEdgeSizeNormalization;
    ui.elements.edgeSizeNormalizationContainer.style.display =
      ui.convert.boolToDisplayStyle(state.useEdgeSizeNormalization);
    ui.elements.edgeSizeNormalizationMinText.innerHTML =
      ui.convert.numberToText(state.edgeSizeNormalizationMin);
    ui.elements.edgeSizeNormalizationMinSlider.value =
      state.edgeSizeNormalizationMin;
    ui.elements.edgeSizeNormalizationMaxText.innerHTML =
      ui.convert.numberToText(state.edgeSizeNormalizationMax);
    ui.elements.edgeSizeNormalizationMaxSlider.value =
      state.edgeSizeNormalizationMax;
    // Nodes
    ui.composites.menu.setItem(
      ui.elements.nodeHead,
      ui.elements.nodeBody,
      false
    );
    ui.elements.nodeCheckbox.checked = state.showNodes;
    ui.elements.nodeSizeFactorText.innerHTML = ui.convert.numberToText(
      state.nodeSizeFactor
    );
    ui.elements.nodeSizeFactorSlider.value = state.nodeSizeFactor;
    ui.elements.nodeDragFixCheckbox.checked = state.nodeDragFix;
    ui.elements.nodeHoverTooltipCheckbox.checked = state.nodeHoverTooltip;
    // Node images
    ui.composites.menu.setItem(
      ui.elements.nodeImageHead,
      ui.elements.nodeImageBody,
      false
    );
    ui.elements.nodeImageMetaControl.style.display = false;
    ui.elements.nodeImageCheckbox.checked = state.showNodeImages;
    ui.elements.nodeImageSizeFactorText.innerHTML = ui.convert.numberToText(
      state.nodeImageSizeFactor
    );
    ui.elements.nodeImageSizeFactorSlider.value = state.nodeImageSizeFactor;
    // Node labels
    ui.composites.menu.setItem(
      ui.elements.nodeLabelHead,
      ui.elements.nodeLabelBody,
      false
    );
    ui.elements.nodeLabelCheckbox.checked = state.showNodeLabels;
    ui.elements.nodeLabelBorderCheckbox.checked = state.showNodeLabelBorders;
    ui.elements.nodeLabelSizeFactorText.innerHTML = ui.convert.numberToText(
      state.nodeLabelSizeFactor
    );
    ui.elements.nodeLabelSizeFactorSlider.value = state.nodeLabelSizeFactor;
    // Edges
    ui.composites.menu.setItem(
      ui.elements.edgeHead,
      ui.elements.edgeBody,
      false
    );
    ui.elements.edgeCheckbox.checked = state.showEdges;
    ui.elements.edgeSizeFactorText.innerHTML = ui.convert.numberToText(
      state.edgeSizeFactor
    );
    ui.elements.edgeSizeFactorSlider.value = state.edgeSizeFactor;
    ui.elements.edgeCurvatureText.innerHTML = ui.convert.numberToText(
      state.edgeCurvature
    );
    ui.elements.edgeCurvatureSlider.value = state.edgeCurvature;
    ui.elements.edgeHoverTooltipCheckbox.checked = state.edgeHoverTooltip;
    // Layout algorithm
    ui.composites.menu.setItem(
      ui.elements.layoutAlgorithmHead,
      ui.elements.layoutAlgorithmBody,
      false
    );
    ui.elements.simulationCheckbox.checked = state.layoutAlgorithmActive;
    ui.elements.manyBodyForceCheckbox.checked = state.useManyBodyForce;
    ui.elements.manyBodyForceContainer.style.opacity = ui.convert.boolToOpacity(
      state.useManyBodyForce
    );
    ui.elements.manyBodyForceStrengthText.innerHTML = ui.convert.numberToText(
      state.manyBodyForceStrength
    );
    ui.elements.manyBodyForceStrengthSlider.value = state.manyBodyForceStrength;
    ui.elements.manyBodyForceThetaText.innerHTML = ui.convert.numberToText(
      state.manyBodyForceTheta
    );
    ui.elements.manyBodyForceThetaSlider.value = state.manyBodyForceTheta;
    ui.elements.manyBodyForceMinDistCheckbox.checked =
      state.useManyBodyForceMinDistance;
    ui.elements.manyBodyForceMinDistContainer.style.opacity =
      ui.convert.boolToOpacity(state.useManyBodyForceMinDistance);
    ui.elements.manyBodyForceMinDistText.innerHTML = ui.convert.numberToText(
      state.manyBodyForceMinDistance
    );
    ui.elements.manyBodyForceMinDistSlider.value =
      state.manyBodyForceMinDistance;
    ui.elements.manyBodyForceMaxDistCheckbox.checked =
      state.useManyBodyForceMaxDistance;
    ui.elements.manyBodyForceMaxDistContainer.style.opacity =
      ui.convert.boolToOpacity(state.useManyBodyForceMaxDistance);
    ui.elements.manyBodyForceMaxDistText.innerHTML = ui.convert.numberToText(
      state.manyBodyForceMaxDistance
    );
    ui.elements.manyBodyForceMaxDistSlider.value =
      state.manyBodyForceMaxDistance;
    ui.elements.linksForceCheckbox.checked = state.useLinksForce;
    ui.elements.linksForceContainer.style.opacity = ui.convert.boolToOpacity(
      state.useLinksForce
    );
    ui.elements.linksForceDistanceText.innerHTML = ui.convert.numberToText(
      state.linksForceDistance
    );
    ui.elements.linksForceDistanceSlider.value = state.linksForceDistance;
    ui.elements.linksForceStrengthText.innerHTML = ui.convert.numberToText(
      state.linksForceStrength
    );
    ui.elements.linksForceStrengthSlider.value = state.linksForceStrength;
    ui.elements.xPositioningForceCheckbox.checked = state.useXPositioningForce;
    ui.elements.xPositioningForceContainer.style.opacity =
      ui.convert.boolToOpacity(state.useXPositioningForce);
    ui.elements.xPositioningForceStrengthText.innerHTML =
      ui.convert.numberToText(state.xPositioningForceStrength);
    ui.elements.xPositioningForceStrengthSlider.value =
      state.xPositioningForceStrength;
    ui.elements.yPositioningForceCheckbox.checked = state.useYPositioningForce;
    ui.elements.yPositioningForceContainer.style.opacity =
      ui.convert.boolToOpacity(state.useYPositioningForce);
    ui.elements.yPositioningForceStrengthText.innerHTML =
      ui.convert.numberToText(state.yPositioningForceStrength);
    ui.elements.yPositioningForceStrengthSlider.value =
      state.yPositioningForceStrength;
    ui.elements.zPositioningForceCheckbox.checked = state.useZPositioningForce;
    ui.elements.zPositioningForceContainer.style.opacity =
      ui.convert.boolToOpacity(state.useZPositioningForce);
    ui.elements.zPositioningForceStrengthText.innerHTML =
      ui.convert.numberToText(state.zPositioningForceStrength);
    ui.elements.zPositioningForceStrengthSlider.value =
      state.zPositioningForceStrength;
    ui.elements.centeringForceCheckbox.checked = state.useCenteringForce;

    ui.initSelectionValues();
  },

  initSelectionValues() {
    function setSelectionOptionsAndValue(element, options, value) {
      if (!options.includes(value)) {
        value = options[0];
      }
      ui.composites.selection(element, options);
      element.value = value;
    }
    // Node label text data source
    setSelectionOptionsAndValue(
      ui.elements.nodeLabelTextDataSourceSelect,
      state.parsedData.general.node_properties.node_label_text_data_sources,
      state.nodeLabelTextDataSource
    );
    // Node size data source
    setSelectionOptionsAndValue(
      ui.elements.nodeSizeDataSourceSelect,
      state.parsedData.general.node_properties.node_size_data_sources,
      state.nodeSizeDataSource
    );
    // Edge size data source
    setSelectionOptionsAndValue(
      ui.elements.edgeSizeDataSourceSelect,
      state.parsedData.general.edge_properties.edge_size_data_sources,
      state.edgeSizeDataSource
    );
  },

  deleteChildElements(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  },

  convert: {
    numberToText(number, numDigits = 2) {
      return String(Number(number).toFixed(numDigits));
    },

    boolToDisplayStyle(isVisible) {
      if (isVisible) {
        return "block";
      }
      return "none";
    },

    boolToOpacity(isActive) {
      if (isActive) {
        return 1.0;
      }
      return 0.25;
    },
  },

  setBehavior() {
    // Window resize (includes ctrl+wheel zoom, landscape/portrait orientation on phones)
    window.onresize = function () {
      ui.composites.responsiveContainer.adaptToResize();
      ui.composites.graph.updateGraphDrawingArea();
    };
    // Container resize
    ui.elements.graphContainer.onmouseup = function () {
      const currentHeight = parseInt(ui.elements.graphContainer.clientHeight);
      if (currentHeight != state.graphContainerHeight) {
        ui.composites.responsiveContainer.adaptToResize();
        ui.composites.graph.updateGraphDrawingArea();
      }
    };
    ui.elements.detailsContainer.onmouseup = function () {
      const currentHeight = parseInt(ui.elements.detailsContainer.clientHeight);
      if (currentHeight != state.detailsContainerHeight) {
        ui.composites.responsiveContainer.adaptToResize();
      }
    };
    // Tooltip
    ui.elements.tooltipContainer.onmouseover = function () {
      ui.composites.tooltip.show();
    };
    ui.elements.tooltipContainer.onmouseout = function () {
      ui.composites.tooltip.hide();
    };
    // General menu
    ui.elements.generalHead.onclick = function () {
      ui.composites.menu.toggleItem(
        ui.elements.generalHead,
        ui.elements.generalBody
      );
    };
    ui.elements.resetButton.onclick = function () {
      app.restart();
    };
    ui.elements.fullscreenButton.onclick = function () {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        ui.elements.mainContainer.requestFullscreen().catch(function (err) {
          alert("Error attempting to enable full-screen mode: " + err.message);
        });
      }
    };
    ui.elements.mainContainer.onfullscreenchange = function () {
      if (document.fullscreenElement) {
        ui.elements.fullscreenButton.innerText = "Exit full screen";
      } else {
        ui.elements.fullscreenButton.innerText = "Enter full screen";
      }
      // Wait for browser to switch to fullscreen and resize divs, then adapt to new sizes
      setTimeout(function () {
        ui.composites.responsiveContainer.adaptToFullscreen();
        ui.composites.graph.updateGraphDrawingArea();
      }, 250);
    };
    ui.elements.pngExportButton.onclick = function () {
      ui.composites.download.png("graph.png");
    };
    ui.elements.jpgExportButton.onclick = function () {
      ui.composites.download.jpg("graph.jpg");
    };
    // Data menu
    ui.elements.dataHead.onclick = function () {
      ui.composites.menu.toggleItem(ui.elements.dataHead, ui.elements.dataBody);
    };
    // - Graph selection
    ui.elements.graphSelection.onchange = function () {
      const chosenGraphIndex = parseInt(this.value);
      state.manager.parseChosenData(chosenGraphIndex);
      state.manager.prepareShownData();
      ui.initSelectionValues();
      ui.composites.graph.createGraph();
    };
    // - Node label text
    ui.elements.nodeLabelTextDataSourceSelect.onchange = function () {
      state.nodeLabelTextDataSource = this.value;
      state.manager.updateNodeLabelTexts();
    };
    // - Node size
    ui.elements.nodeSizeDataSourceSelect.onchange = function () {
      state.nodeSizeDataSource = this.value;
      state.manager.updateNodeSizes();
    };
    ui.elements.nodeSizeNormalizationCheckbox.onchange = function () {
      state.useNodeSizeNormalization = this.checked;
      ui.elements.nodeSizeNormalizationContainer.style.display =
        ui.convert.boolToDisplayStyle(state.useNodeSizeNormalization);
      state.manager.updateNodeSizes();
    };
    ui.elements.nodeSizeNormalizationMinSlider.oninput = function () {
      ui.elements.nodeSizeNormalizationMinText.innerHTML =
        ui.convert.numberToText(this.value);
    };
    ui.elements.nodeSizeNormalizationMinSlider.onchange = function () {
      state.nodeSizeNormalizationMin = parseFloat(this.value);
      if (state.nodeSizeNormalizationMin > state.nodeSizeNormalizationMax) {
        state.nodeSizeNormalizationMax = state.nodeSizeNormalizationMin;
        ui.elements.nodeSizeNormalizationMaxSlider.value =
          state.nodeSizeNormalizationMax;
        ui.elements.nodeSizeNormalizationMaxText.innerHTML =
          ui.convert.numberToText(state.nodeSizeNormalizationMax);
      }
      state.manager.updateNodeSizes();
    };
    ui.elements.nodeSizeNormalizationMaxSlider.oninput = function () {
      ui.elements.nodeSizeNormalizationMaxText.innerHTML =
        ui.convert.numberToText(this.value);
    };
    ui.elements.nodeSizeNormalizationMaxSlider.onchange = function () {
      state.nodeSizeNormalizationMax = parseFloat(this.value);
      if (state.nodeSizeNormalizationMax < state.nodeSizeNormalizationMin) {
        state.nodeSizeNormalizationMin = state.nodeSizeNormalizationMax;
        ui.elements.nodeSizeNormalizationMinSlider.value =
          state.nodeSizeNormalizationMin;
        ui.elements.nodeSizeNormalizationMinText.innerHTML =
          ui.convert.numberToText(state.nodeSizeNormalizationMin);
      }
      state.manager.updateNodeSizes();
    };
    // - Edge size
    ui.elements.edgeSizeDataSourceSelect.onchange = function () {
      state.edgeSizeDataSource = this.value;
      state.manager.updateEdgeSizes();
    };
    ui.elements.edgeSizeNormalizationCheckbox.onchange = function () {
      state.useEdgeSizeNormalization = this.checked;
      ui.elements.edgeSizeNormalizationContainer.style.display =
        ui.convert.boolToDisplayStyle(state.useEdgeSizeNormalization);
      state.manager.updateEdgeSizes();
    };
    ui.elements.edgeSizeNormalizationMinSlider.oninput = function () {
      ui.elements.edgeSizeNormalizationMinText.innerHTML =
        ui.convert.numberToText(this.value);
    };
    ui.elements.edgeSizeNormalizationMinSlider.onchange = function () {
      state.edgeSizeNormalizationMin = parseFloat(this.value);
      if (state.edgeSizeNormalizationMin > state.edgeSizeNormalizationMax) {
        state.edgeSizeNormalizationMax = state.edgeSizeNormalizationMin;
        ui.elements.edgeSizeNormalizationMaxSlider.value =
          state.edgeSizeNormalizationMax;
        ui.elements.edgeSizeNormalizationMaxText.innerHTML =
          ui.convert.numberToText(state.edgeSizeNormalizationMax);
      }
      state.manager.updateEdgeSizes();
    };
    ui.elements.edgeSizeNormalizationMaxSlider.oninput = function () {
      ui.elements.edgeSizeNormalizationMaxText.innerHTML =
        ui.convert.numberToText(this.value);
    };
    ui.elements.edgeSizeNormalizationMaxSlider.onchange = function () {
      state.edgeSizeNormalizationMax = parseFloat(this.value);
      if (state.edgeSizeNormalizationMax < state.edgeSizeNormalizationMin) {
        state.edgeSizeNormalizationMin = state.edgeSizeNormalizationMax;
        ui.elements.edgeSizeNormalizationMinSlider.value =
          state.edgeSizeNormalizationMin;
        ui.elements.edgeSizeNormalizationMinText.innerHTML =
          ui.convert.numberToText(state.edgeSizeNormalizationMin);
      }
      state.manager.updateEdgeSizes();
    };
    // Nodes menu
    ui.elements.nodeHead.onclick = function () {
      ui.composites.menu.toggleItem(ui.elements.nodeHead, ui.elements.nodeBody);
    };
    ui.elements.nodeCheckbox.onchange = function () {
      state.showNodes = this.checked;
      ui.composites.graph.updateNodeVisibilities();
    };
    ui.elements.nodeSizeFactorSlider.oninput = function () {
      ui.elements.nodeSizeFactorText.innerHTML = ui.convert.numberToText(
        this.value
      );
    };
    ui.elements.nodeSizeFactorSlider.onchange = function () {
      state.nodeSizeFactor = parseFloat(this.value);
      state.manager.updateNodeSizes();
    };
    ui.elements.nodeDragFixCheckbox.onchange = function () {
      state.nodeDragFix = this.checked;
    };
    ui.elements.nodeHoverTooltipCheckbox.onchange = function () {
      state.nodeHoverTooltip = this.checked;
    };
    ui.elements.nodeReleaseButton.onclick = function () {
      ui.composites.graph.simulationManager.releaseFixedNodes();
      ui.composites.graph.simulationManager.move();
    };
    // Node images menu
    ui.elements.nodeImageHead.onclick = function () {
      ui.composites.menu.toggleItem(
        ui.elements.nodeImageHead,
        ui.elements.nodeImageBody
      );
    };
    ui.elements.nodeImageCheckbox.onchange = function () {
      state.showNodeImages = this.checked;
      ui.composites.graph.updateNodeImages();
    };
    ui.elements.nodeImageSizeFactorSlider.oninput = function () {
      ui.elements.nodeImageSizeFactorText.innerHTML = ui.convert.numberToText(
        this.value
      );
    };
    ui.elements.nodeImageSizeFactorSlider.onchange = function () {
      state.nodeImageSizeFactor = parseFloat(this.value);
      state.manager.updateNodeImageSizes();
    };
    // Node labels menu
    ui.elements.nodeLabelHead.onclick = function () {
      ui.composites.menu.toggleItem(
        ui.elements.nodeLabelHead,
        ui.elements.nodeLabelBody
      );
    };
    ui.elements.nodeLabelCheckbox.onchange = function () {
      state.showNodeLabels = this.checked;
      ui.composites.graph.updateNodeLabels();
    };
    ui.elements.nodeLabelBorderCheckbox.onchange = function () {
      state.showNodeLabelBorders = this.checked;
      ui.composites.graph.updateNodeLabels();
    };
    ui.elements.nodeLabelSizeFactorSlider.oninput = function () {
      ui.elements.nodeLabelSizeFactorText.innerHTML = ui.convert.numberToText(
        this.value
      );
    };
    ui.elements.nodeLabelSizeFactorSlider.onchange = function () {
      state.nodeLabelSizeFactor = parseFloat(this.value);
      state.manager.updateNodeLabelSizes();
    };
    // Edges menu
    ui.elements.edgeHead.onclick = function () {
      ui.composites.menu.toggleItem(ui.elements.edgeHead, ui.elements.edgeBody);
    };
    ui.elements.edgeCheckbox.onchange = function () {
      state.showEdges = this.checked;
      ui.composites.graph.updateEdgeVisibilities();
    };
    ui.elements.edgeSizeFactorSlider.oninput = function () {
      ui.elements.edgeSizeFactorText.innerHTML = ui.convert.numberToText(
        this.value
      );
    };
    ui.elements.edgeSizeFactorSlider.onchange = function () {
      state.edgeSizeFactor = parseFloat(this.value);
      state.manager.updateEdgeSizes();
    };
    ui.elements.edgeCurvatureSlider.oninput = function () {
      ui.elements.edgeCurvatureText.innerHTML = ui.convert.numberToText(
        this.value
      );
    };
    ui.elements.edgeCurvatureSlider.onchange = function () {
      state.edgeCurvature = parseFloat(this.value);
      state.manager.updateEdgeCurvatures();
    };
    ui.elements.edgeHoverTooltipCheckbox.onchange = function () {
      state.edgeHoverTooltip = this.checked;
    };
    // Layout algorithm menu
    ui.elements.layoutAlgorithmHead.onclick = function () {
      ui.composites.menu.toggleItem(
        ui.elements.layoutAlgorithmHead,
        ui.elements.layoutAlgorithmBody
      );
    };
    ui.elements.simulationCheckbox.onchange = function () {
      state.layoutAlgorithmActive = !state.layoutAlgorithmActive;
      if (state.layoutAlgorithmActive) {
        ui.composites.graph.simulationManager.restart();
      } else {
        ui.composites.graph.simulationManager.stop();
      }
    };
    ui.elements.manyBodyForceCheckbox.onchange = function () {
      state.useManyBodyForce = this.checked;
      ui.elements.manyBodyForceContainer.style.opacity =
        ui.convert.boolToOpacity(state.useManyBodyForce);
      ui.composites.graph.simulationManager.setManyBodyForce();
      ui.composites.graph.simulationManager.move();
    };
    ui.elements.manyBodyForceStrengthSlider.oninput = function () {
      ui.elements.manyBodyForceStrengthText.innerHTML = ui.convert.numberToText(
        this.value
      );
    };
    ui.elements.manyBodyForceStrengthSlider.onchange = function () {
      state.manyBodyForceStrength = parseFloat(this.value);
      ui.composites.graph.simulationManager.setManyBodyForce();
      if (state.useManyBodyForce) {
        ui.composites.graph.simulationManager.move();
      }
    };
    ui.elements.manyBodyForceThetaSlider.oninput = function () {
      ui.elements.manyBodyForceThetaText.innerHTML = ui.convert.numberToText(
        this.value
      );
    };
    ui.elements.manyBodyForceThetaSlider.onchange = function () {
      state.manyBodyForceTheta = parseFloat(this.value);
      ui.composites.graph.simulationManager.setManyBodyForce();
      if (state.useManyBodyForce) {
        ui.composites.graph.simulationManager.move();
      }
    };
    ui.elements.manyBodyForceMinDistCheckbox.onchange = function () {
      state.useManyBodyForceMinDistance = this.checked;
      ui.composites.graph.simulationManager.setManyBodyForce();
      ui.elements.manyBodyForceMinDistContainer.style.opacity =
        ui.convert.boolToOpacity(state.useManyBodyForceMinDistance);
    };
    ui.elements.manyBodyForceMinDistSlider.oninput = function () {
      ui.elements.manyBodyForceMinDistText.innerHTML = ui.convert.numberToText(
        this.value
      );
    };
    ui.elements.manyBodyForceMinDistSlider.onchange = function () {
      state.manyBodyForceMinDistance = parseFloat(this.value);
      if (state.manyBodyForceMinDistance > state.manyBodyForceMaxDistance) {
        state.manyBodyForceMaxDistance = state.manyBodyForceMinDistance;
        ui.elements.manyBodyForceMaxDistText.innerHTML =
          ui.convert.numberToText(state.manyBodyForceMaxDistance);
        ui.elements.manyBodyForceMaxDistSlider.value =
          state.manyBodyForceMaxDistance;
      }
      ui.composites.graph.simulationManager.setManyBodyForce();
      if (state.useManyBodyForce) {
        ui.composites.graph.simulationManager.move();
      }
    };
    ui.elements.manyBodyForceMaxDistCheckbox.onchange = function () {
      state.useManyBodyForceMaxDistance = this.checked;
      ui.composites.graph.simulationManager.setManyBodyForce();
      ui.elements.manyBodyForceMaxDistContainer.style.opacity =
        ui.convert.boolToOpacity(state.useManyBodyForceMaxDistance);
    };
    ui.elements.manyBodyForceMaxDistSlider.oninput = function () {
      ui.elements.manyBodyForceMaxDistText.innerHTML = ui.convert.numberToText(
        this.value
      );
    };
    ui.elements.manyBodyForceMaxDistSlider.onchange = function () {
      state.manyBodyForceMaxDistance = parseFloat(this.value);
      if (state.manyBodyForceMaxDistance < state.manyBodyForceMinDistance) {
        state.manyBodyForceMinDistance = state.manyBodyForceMaxDistance;
        ui.elements.manyBodyForceMinDistText.innerHTML =
          ui.convert.numberToText(state.manyBodyForceMinDistance);
        ui.elements.manyBodyForceMinDistSlider.value =
          state.manyBodyForceMinDistance;
      }
      ui.composites.graph.simulationManager.setManyBodyForce();
      if (state.useManyBodyForce) {
        ui.composites.graph.simulationManager.move();
      }
    };
    ui.elements.linksForceCheckbox.onchange = function () {
      state.useLinksForce = this.checked;
      ui.elements.linksForceContainer.style.opacity = ui.convert.boolToOpacity(
        state.useLinksForce
      );
      ui.composites.graph.simulationManager.setLinksForce();
      ui.composites.graph.simulationManager.move();
    };
    ui.elements.linksForceDistanceSlider.oninput = function () {
      ui.elements.linksForceDistanceText.innerHTML = ui.convert.numberToText(
        this.value
      );
    };
    ui.elements.linksForceDistanceSlider.onchange = function () {
      state.linksForceDistance = parseFloat(this.value);
      ui.composites.graph.simulationManager.setLinksForce();
      if (state.useLinksForce) {
        ui.composites.graph.simulationManager.move();
      }
    };
    ui.elements.linksForceStrengthSlider.oninput = function () {
      ui.elements.linksForceStrengthText.innerHTML = ui.convert.numberToText(
        this.value
      );
    };
    ui.elements.linksForceStrengthSlider.onchange = function () {
      state.linksForceStrength = parseFloat(this.value);
      ui.composites.graph.simulationManager.setLinksForce();
      if (state.useLinksForce) {
        ui.composites.graph.simulationManager.move();
      }
    };
    ui.elements.xPositioningForceCheckbox.onchange = function () {
      state.useXPositioningForce = this.checked;
      ui.elements.xPositioningForceContainer.style.opacity =
        ui.convert.boolToOpacity(state.useXPositioningForce);
      ui.composites.graph.simulationManager.setXPositioningForce();
      ui.composites.graph.simulationManager.move();
    };
    ui.elements.xPositioningForceStrengthSlider.oninput = function () {
      ui.elements.xPositioningForceStrengthText.innerHTML =
        ui.convert.numberToText(this.value);
    };
    ui.elements.xPositioningForceStrengthSlider.onchange = function () {
      state.xPositioningForceStrength = parseFloat(this.value);
      ui.composites.graph.simulationManager.setXPositioningForce();
      if (state.useXPositioningForce) {
        ui.composites.graph.simulationManager.move();
      }
    };
    ui.elements.yPositioningForceCheckbox.onchange = function () {
      state.useYPositioningForce = this.checked;
      ui.elements.yPositioningForceContainer.style.opacity =
        ui.convert.boolToOpacity(state.useYPositioningForce);
      ui.composites.graph.simulationManager.setYPositioningForce();
      ui.composites.graph.simulationManager.move();
    };
    ui.elements.yPositioningForceStrengthSlider.oninput = function () {
      ui.elements.yPositioningForceStrengthText.innerHTML =
        ui.convert.numberToText(this.value);
    };
    ui.elements.yPositioningForceStrengthSlider.onchange = function () {
      state.yPositioningForceStrength = parseFloat(this.value);
      ui.composites.graph.simulationManager.setYPositioningForce();
      if (state.useYPositioningForce) {
        ui.composites.graph.simulationManager.move();
      }
    };
    ui.elements.zPositioningForceCheckbox.onchange = function () {
      state.useZPositioningForce = this.checked;
      ui.elements.zPositioningForceContainer.style.opacity =
        ui.convert.boolToOpacity(state.useZPositioningForce);
      ui.composites.graph.simulationManager.setZPositioningForce();
      ui.composites.graph.simulationManager.move();
    };
    ui.elements.zPositioningForceStrengthSlider.oninput = function () {
      ui.elements.zPositioningForceStrengthText.innerHTML =
        ui.convert.numberToText(this.value);
    };
    ui.elements.zPositioningForceStrengthSlider.onchange = function () {
      state.yPositioningForceStrength = parseFloat(this.value);
      ui.composites.graph.simulationManager.setZPositioningForce();
      if (state.useZPositioningForce) {
        ui.composites.graph.simulationManager.move();
      }
    };
    ui.elements.centeringForceCheckbox.onchange = function () {
      state.useCenteringForce = this.checked;
      ui.composites.graph.simulationManager.setCenteringForce();
      ui.composites.graph.simulationManager.move();
    };
  },
};

const app = {
  start() {
    state.manager.fetchRawDataFromTemplating();
    state.manager.parseChosenData(0);
    state.manager.prepareShownData();
    ui.init();
    // Wait a bit to finish UI rendering, then start potentially slow layout computation
    setTimeout(function () {
      ui.composites.graph.createGraph();
      ui.setBehavior();
    }, 800);
    // Reduce risk of getting stuck with a wrong drawing area size
    function checkIfSizeUpdateRequired() {
      if (ui.elements.graphContainer.clientWidth != state.graphContainerWidth) {
        ui.composites.responsiveContainer.adaptToResize();
        ui.composites.graph.updateGraphDrawingArea();
      }
    }
    [1, 2, 5, 8, 12, 15, 20, 25, 30, 35, 40, 45, 50, 60, 90].forEach(function (
      delay
    ) {
      setTimeout(checkIfSizeUpdateRequired, delay * 1000);
    });
  },

  restart() {
    ui.composites.graph.simulationManager.stop();
    app.start();
  },
};

// Start website dynamics
window.addEventListener("unload", function () {
  state.threeObjects.disposeAll();
});
app.start();
