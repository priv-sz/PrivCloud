// charts
export let Detect_VOC_charts_data = {};

export let Detect_COCO_charts_data = {
    // inference_time box_AP mask_AP train_mem backbone
    'Faster R-CNN':[
        [13.6,36.4,null,3.8,'R-50-FPN'],
        [11.9,38.5,null,5.7,'R-101-FPN'],
        [10.3,40.1,null,6.9,'ResneXt-101-32x4d-FPN'],
    ],
    'Mask R-CNN':[
        [10.2,37.4,34.2,3.8,'R-50-FPN'],
        [9.5,39.4,35.9,5.8,'R-101-FPN'],
        [8.3,41.1,37.1,7.1,'ResneXt-101-32x4d-FPN'],
    ],
    'DCN':[
        [7.7,41.1,37.2,4.5,'R-50-FPN'],
        [6.5,43.2,38.7,6.4,'R-101-FPN'],
        [6.6,43.4,null,7.1,'ResneXt-101-32x4d-FPN'],
    ],
    'GN':[
        [5.4,39.6,36.1,7.2,'R-50-FPN'],
        [4.8,41.5,37,8.9,'R-101-FPN'],
        [4.1,41.9,37.3,9.7,'ResneXt-101-32x4d-FPN'],
    ],
    'RetinaNet':[
        [8,35.7,null,6.8,'R-50-FPN'],
        [10.4,37.8,null,5.3,'R-101-FPN'],
        [9.3,39,null,6.7,'ResneXt-101-32x4d-FPN'],
    ],
    'RetinaNet +DCN*':[
        [7,37.7,null,7.5,'R-50-FPN'],
        [9.4,39.8,null,5.8,'R-101-FPN'],
        [8.3,40.8,null,7.3,'ResneXt-101-32x4d-FPN'],
    ],
    'RetinaNet +GN *':[
        [8.2,37.8,null,7.6,'R-50-FPN'],
        [10.6,39.8,null,5.9,'R-101-FPN'],
        [9.5,41.8,null,7.4,'ResneXt-101-32x4d-FPN'],
    ],
    'Cascade':[
        [7.6,40.9,35.5,5.1,'R-50-FPN'],
        [6.8,42.6,37,7.2,'R-101-FPN'],
        [6.6,44.4,38.2,8.4,'ResneXt-101-32x4d-FPN'],
    ],
    'Cascade + DCN':[
        [6.6,40.9,38.5,5.6,'R-50-FPN'],
        [5.8,42.6,39.7,7.9,'R-101-FPN'],
        [5.6,44.4,41.3,9.2,'ResneXt-101-32x4d-FPN'],
    ],
    'Cascade + DCN + GN':[
        [6.3,41.9,38,5.8,'R-50-FPN'],
        [5.5,43.6,39.3,8.2,'R-101-FPN'],
        [5.3,45.4,41.3,40.8,'ResneXt-101-32x4d-FPN'],
    ],
    'FCOS':[
        [14,37.4,null,3.8,'R-50-FPN'],
        [10,41.5,null,5.1,'R-101-FPN'],
        [7,42.7,null,9.1,'ResneXt-101-32x4d-FPN'],
    ],
    'FCOS+DCN *':[
        [10,37.9,null,4.2,'R-50-FPN'],
        [8,42.6,null,5.6,'R-101-FPN'],
        [6,43.2,null,10,'ResneXt-101-32x4d-FPN'],
    ],
    'FCOS +GN *':[
        [13,38,null,3.9,'R-50-FPN'],
        [9.6,42.9,null,5.3,'R-101-FPN'],
        [6.7,43.7,null,9.3,'ResneXt-101-32x4d-FPN'],
    ],

};


// table
export let Detect_VOC_table_data = [
    {
        key: '1',
        Network: 'mobilenet-v1',
        Flops: '569',
        Params:4.24,
        Top1:29.1,
        Top5:10.1,
    },
    {
        key: '2',
        Network: 'mobilenet-v1-0.75',
        Flops: '317',
        Params:2.59,
        Top1:31.6,
        Top5:11.8
    }, {
        key: '3',
        Network: 'mobilenet-v1-0.5',
        Flops: 150,
        Params:1.34,
        Top1:36.7,
        Top5:15.1
    }, {
        key: '4',
        Network: 'mobilenet-v1-0.25',
        Flops: 41,
        Params:0.47,
        Top1:50.2,
        Top5:25.8
    }, {
        key: '5',
        Network: 'mobilenet-v1-swish',
        Flops: 569,
        Params:4.24,
        Top1:25.8,
        Top5:8.30
    },{
        key: '6',
        Network: 'mobilenet-v2',
        Flops: 300,
        Params:3.4,
        Top1:28.3,
        Top5:null
    },{
        key: '7',
        Network: 'mobilenet-v2',
        Flops: 585,
        Params:6.9,
        Top1:25.3,
        Top5:null
    },
    {
        key: '8',
        Network: 'shufflenet-2x-g3-se',
        Flops: 304,
        Params:3.18,
        Top1:33.78,
        Top5:null
    }, {
        key: '9',
        Network: 'shufflenet-2x-g3',
        Flops: 351,
        Params:3.48,
        Top1:32.98,
        Top5:null
    },
    {
        key: '10',
        Network: 'shufflenet-1.5x-g3',
        Flops: 351,
        Params:3.48,
        Top1:32.98,
        Top5:null
    }, {
        key: '11',
        Network: 'shufflenet-1x-g8',
        Flops: 351,
        Params:3.48,
        Top1:33.30,
        Top5:null
    },{
        key: '12',
        Network: 'resnet110',
        Flops: 247,
        Params:1.72,
        Top1:5.56,
        Top5:null
    }, {
        key: '13',
        Network: 'resnet110-mixup',
        Flops: 247,
        Params:1.72,
        Top1:4.99,
        Top5:null
    },
    {
        key: '14',
        Network: 'resnext29_8x64d-mixup',
        Flops: 5387,
        Params:34.5,
        Top1:2.92,
        Top5:null
    }, {
        key: '15',
        Network: 'resnext29_8x64d',
        Flops: 5387,
        Params:34.5,
        Top1:3.91,
        Top5:null
    },{
        key: '16',
        Network: 'crossnet62-e48e05',
        Flops: 304,
        Params:3.18,
        Top1:33.78,
        Top5:null
    },{
        key: '17',
        Network: 'crossnet62-e64e05',
        Flops: 351,
        Params:3.48,
        Top1:32.98,
        Top5:null
    },{
        key: '18',
        Network: 'crossnet47',
        Flops: 351,
        Params:3.48,
        Top1:32.98,
        Top5:null
    },{
        key: '19',
        Network: 'crossnet47-dropout',
        Flops: 351,
        Params:3.48,
        Top1:33.30,
        Top5:null
    },{
        key: '20',
        Network: 'nasnet-A',
        Flops: 304,
        Params:3.18,
        Top1:33.78,
        Top5:null
    },{
        key: '21',
        Network: 'nasnet-B',
        Flops: 351,
        Params:3.48,
        Top1:32.98,
        Top5:null
    },{
        key: '22',
        Network: 'nasnet-c',
        Flops: 351,
        Params:3.48,
        Top1:32.98,
        Top5:null
    },{
        key: '23',
        Network: 'pnasnet-A',
        Flops: 351,
        Params:3.48,
        Top1:33.30,
        Top5:null
    },
];

export let Detect_COCO_table_data = [
    {
        key: '1',
        Method:'Faster R-CNN',
        Backbone: 'R-50-FPN',
        train_mem: '3.8',
        inference_time:'13.6',
        box_AP:'36.4',
        mask_AP:null,
        note:null,
        'href':'https://pytorch.org/'
    },{
        key: '2',
        Method:'Faster R-CNN',
        Backbone: 'R-101-FPN',
        train_mem: '5.7',
        inference_time:'11.9',
        box_AP:'38.5',
        mask_AP:null,
        note:null
    },{
        key: '3',
        Method:'Faster R-CNN',
        Backbone: 'ResneXt-101-32x4d-FPN',
        train_mem: '6.9',
        inference_time:'10.3',
        box_AP:'40.1',
        mask_AP:null,
        note:null
    },{
        key: '4',
        Method:'Mask R-CNN',
        Backbone: 'R-50-FPN',
        train_mem: '3.8',
        inference_time:'10.2',
        box_AP:'37.4',
        mask_AP:'34.2',
        note:null
    },{
        key: '5',
        Method:'Mask R-CNN',
        Backbone: 'R-101-FPN',
        train_mem: '5.8',
        inference_time:'9.5',
        box_AP:'39.4',
        mask_AP:'35.9',
        note:null
    },{
        key: '6',
        Method:'Mask R-CNN',
        Backbone: 'ResneXt-101-32x4d-FPN',
        train_mem: '7.1',
        inference_time:'8.3',
        box_AP:'41.1',
        mask_AP:'37.1',
        note:null
    },{
        key: '7',
        Method:'DCN',
        Backbone: 'R-50-FPN',
        train_mem: '4.5(3.9)',
        inference_time:'7.7(10.2)',
        box_AP:'41.1(40)',
        mask_AP:'37.2',
        note:null
    },{
        key: '8',
        Method:'DCN',
        Backbone: 'R-101-FPN',
        train_mem: '6.4',
        inference_time:'6.5(8.0)',
        box_AP:'43.2(42.1)',
        mask_AP:'38.7',
        note:null
    },{
        key: '9',
        Method:'DCN',
        Backbone: 'ResneXt-101-32x4d-FPN',
        train_mem: '7.1',
        inference_time:'6.6',
        box_AP:'43.4',
        mask_AP:null,
        note:'dconv(c3-c5)  / mask-rcnn'
    },{
        key: '10',
        Method:'GN',
        Backbone: 'R-50-FPN',
        train_mem: '7.2(5.5)',
        inference_time:'5.4(8.4)',
        box_AP:'39.6(38.2)',
        mask_AP:'36.1',
        note:null
    },{
        key: '11',
        Method:'GN',
        Backbone: 'R-101-FPN',
        train_mem: '8.9(6.1)',
        inference_time:'4.8(7.3)',
        box_AP:'41.5(39.7)',
        mask_AP:37,
        note:null
    },{
        key: '12',
        Method:'GN',
        Backbone: 'ResneXt-101-32x4d-FPN',
        train_mem: '9.7(7.1)',
        inference_time:'4.1(6.8)',
        box_AP:'41.9(40.1)',
        mask_AP:'37.3',
        note:null
    },{
        key: '13',
        Method:'RetinaNet',
        Backbone: 'R-50-FPN',
        train_mem: '6.8',
        inference_time:'8',
        box_AP:'35.7',
        mask_AP:null,
        note:null
    },{
        key: '14',
        Method:'RetinaNet',
        Backbone: 'R-101-FPN',
        train_mem: '5.3',
        inference_time:'10.4',
        box_AP:'37.8',
        mask_AP:null,
        note:null
    },{
        key: '15',
        Method:'RetinaNet',
        Backbone: 'ResneXt-101-32x4d-FPN',
        train_mem: '6.7',
        inference_time:'9.3',
        box_AP:'39',
        mask_AP:null,
        note:null
    },{
        key: '16',
        Method:'RetinaNet + DCN*',
        Backbone: 'R-50-FPN',
        train_mem: '7.5',
        inference_time:'7',
        box_AP:'37.7',
        mask_AP:null,
        note:null
    },{
        key: '17',
        Method:'RetinaNet + DCN*',
        Backbone: 'R-101-FPN',
        train_mem: '5.8',
        inference_time:'9.4',
        box_AP:'39.8',
        mask_AP:null,
        note:null
    },{
        key: '18',
        Method:'RetinaNet + DCN*',
        Backbone: 'ResneXt-101-32x4d-FPN',
        train_mem: '7.3',
        inference_time:'8.3',
        box_AP:'40.8',
        mask_AP:null,
        note:null
    },
];

export let Detect_VOC_detail_table_data = [];

export let Detect_COCO_detail_table_data = [
    ['faster_rcnn_R-50-C4_1x','-','-','34.6/55.3/37.0/17.5/39.2/47.8','-','https://pytorch.org/'],
    ['faster_rcnn_R-50-C5-2FC_1x','-','-','34.3/55.6/36.3/17.0/37.9/46.8','-',],
    ['faster_rcnn_R-50-FPN_1x','-','-','36.8/58.4/39.9/21.0/39.7/48.1','-',],
    ['faster_rcnn_R-50-FPN_2x','-','-','37.7/59.1/40.8/21.4/40.7/49.4','-',],
    ['faster_rcnn_R-101-C4_1x','-','-','38.0/59.2/41.0/19.6/42.6/52.8','-',],
    ['faster_rcnn_R-101-FPN_1x','-','-', '39.0/61.0/42.3/22.8/42.7/50.7','-',],
    ['faster_rcnn_R-101-FPN_2x','-','-', '39.7/61.2/43.1/22.3/43.1/52.5','-',],
    ['faster_rcnn_R-152-FPN_1x','-','-','39.9/61.6/43.7/22.7/43.6/52.1','-',],

    ['faster_rcnn_A-R-50-FPN_1x','-','-', '39.7/61.8/43.1/23.3/43.1/51.4','-',],
    ['faster_rcnn_A-R-101-FPN_1x','-','-','42.0/64.0/45.8/25.1/45.9/54.6','-',],
    ['faster_rcnn_A-RX-50-32x4d-FPN_1x','-','-','40.5/63.1/43.4/24.1/44.0/52.4','-',],
    ['faster_rcnn_SE-A-R-50-FPN_1x','-','-', '40.4/62.6/44.2/23.8/44.0/51.9','-',],
    ['faster_rcnn_A-R-50-DCN@C345-FPN_1x','-','-','42.4/64.5/46.4/25.9/45.8/55.2','-',],
    ['faster_rcnn_R-50-DCN@C5-FPN_1x','-','-','38.8/60.8/42.1/22.9/41.8/51.2','-',],
    ['faster_rcnn_R-50-DCN@C345-FPN_1x','-','-', '40.2/62.4/43.8/24.2/43.2/53.7','-',],
    ['faster_rcnn_R-50-DCN@C345-FPN_2x','-','-','40.5/62.3/43.9/24.7/43.2/53.6','-',],
    ['faster_rcnn_R-50-DCN@C345-FPN_2x_ms','-','-', '41.7/63.9/45.6/26.3/44.9/54.4','-',],
    ['faster_rcnn_R-50-DCN@C345-FPN-4CONV1FC-GN_1x','-','-', '40.1/61.9/43.5/22.9/43.0/53.0','-',],
    ['faster_rcnn_R-50-MDCN@C5-FPN_1x','-','-','39.3/61.5/42.8/23.2/42.1/51.9','-',],
    ['faster_rcnn_R-50-MDCN@C345-FPN_1x','-','-', '40.3/62.4/44.1/24.4/43.4/53.3','-',],
    ['faster_rcnn_R-50-MDCN@C345-FPN_2x','-','-', '40.3/62.0/44.0/23.6/43.2/53.6','-',],
    ['faster_rcnn_R-101-DCN@C345-FPN_1x','-','-', '41.8/63.9/45.7/24.6/45.8/54.7','-',],

    ['faster_rcnn_R-50-FPN-2FC-GN_1x','-','-','37.3/59.7/40.2/22.5/40.3/47.9','-',],
    ['faster_rcnn_R-50-FPN-2FC-GN_2x','-','-', '37.0/59.5/39.6/22.1/40.0/47.3','-',],
    ['faster_rcnn_R-50-FPN-4CONV1FC-GN_1x','-','-', '38.0/59.5/41.1/22.2/40.7/49.0','-',],
    ['faster_rcnn_R-50-FPN-4CONV1FC-GN_2x','-','-','39.0/59.9/42.5/22.7/41.9/50.7','-',],
    ['faster_rcnn_R-50-GN-FPN_1x','-','-','37.0/59.5/39.6/22.1/40.0/47.3','-',],

    ['cascade_rcnn_A-R-50-FPN_1x','-','-','42.6/61.5/46.6/24.9/46.2/56.0','-',],
    ['cascade_rcnn_R-50-DCN@C345-FPN_1x','-','-', '42.7/61.9/46.4/25.1/46.8/56.4','-',],
    ['cascade_rcnn_R-50-FPN_1x','-','-','40.3/58.5/44.0/22.7/43.1/54.0','-',],
    ['cascade_rcnn_R-50-FPN_2x','-','-', '40.2/58.5/43.8/22.4/43.2/53.7','-',]
];
