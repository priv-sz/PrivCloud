
// charts
export let Classification_Cifar_charts_data = {

};

// export let Classification_Image_charts_data = {
//     // vec top1 top5 flops params  backbone
//     'mobilenet':[
//         [4050,74.37,91.87,569, 4.24, 'mobilenet-V1-1.0'],
//         [5900,77.36,93.57,317,2.59, 'mobilenet-v1-0.75'],
//         [9000,77.86,93.46,150,1.34, 'mobilenet-v1-0.5']
//     ],
//     'crossnet':[
//         [3000,77.86,94.01,569,4.24,'crossnet 1'],
//         [5500,79.22,94.64,317,2.59,'crossnet 2'],
//         [8300,70.94,89.83,150,1.34,'crossnet 3'],
//     ],
//     'vgg':[
//         [940,74.65,92.08,569,4.24,'vgg13'],
//         [760,77.67,93.82,317,2.59,'vgg16'],
//         [640,70.94,89.83,150,1.34,'vgg19']
//     ],
//     'resnet':[
//         [4100,79.22,94.64,569,4.24,'resnet18'],
//         [1200,70.94,89.83,317,2.59,'resnet50'],
//         [680,74.65,92.08,150,1.34,'resnet101']
//     ],
//     '32/64X4d':[
//         [830,77.67,93.82,569,4.24,'resnet 50 32X4d'],
//         [470,79.22,94.64,317,2.59,'resnet 101 32X4d'],
//         [280,70.94,89.83,150,1.34,'resnet 101 64X4d']
//     ],
//     'aligned_resnet':[
//         [810,74.65,92.08,569,4.24,'aligned_resnet18'],
//         [450,79.22,94.64,317,2.59,'aligned_resnet50'],
//         [250,79.22,94.64,150,1.34,'aligned_resnet101']
//     ],
//     'Se-resnet':[
//         [1020,70.94,89.83,569,4.24,'Se-resnet18'],
//         [690,74.65,92.08,317,2.59,'Se-resnet50'],
//         [560,77.67,93.82,150,1.34,'Se-resnet101'],
//     ]
// };


export let Classification_Image_charts_data = {'mobilenet': [[0.008, ' 73.71', ' 91.49', 567.7, 4.23, 'mobilenet_v1_0.25'], [0.013, ' 71.87', ' 90.28', 299.4, 3.5, 'mobilenet_v2_1.0_1.5x'], [0.018, ' 73.71', ' 91.49', 214.0, 4.22, 'mobilenet_v3_large_0.4x'], [0.018, ' 74.62', ' 92.02', 214.0, 4.22, 'mobilenet_v3_large_1.5x']], 'resnet': [[0.028, ' 78.49', ' 94.06', 4326.8, 28.1, 'resnet101d'], [0.008, ' 77.5', ' 93.90', 4326.8, 25.57, 'resnet18d'], [0.012, ' 77.5', ' 93.90', 4326.8, 25.57, 'resnet34d'], [0.013, ' 77.5', ' 93.90', 3855.9, 25.55, 'resnet50a'], [0.016, ' 77.5', ' 93.90', 3855.9, 25.55, 'resnet50a_normal'], [0.016, ' 77.5', ' 93.90', 4087.1, 25.55, 'resnet50b'], [0.015, ' 77.5', ' 93.90', 4326.8, 25.57, 'resnet50c'], [0.015, ' 77.5', ' 93.90', 4326.8, 28.1, 'resnet50d']], 'resnext': [[0.074, ' 77.5', ' 93.90', 11699.8, 64.4, 'aligned_resnext101d_32x4d'], [0.038, ' 79.17', ' 94.44', 4468.07, 25.04, 'resnext101d_32x4d'], [0.024, ' 80.45', ' 95.13', 4468.07, 25.04, 'resnext50d_32x4d']]}

//table
export let Classification_Cifar_table_data =  [
    {
        key: '1',
        Network: 'mobilenet-v1',
        Flops: '569',
        Params:4.24,
        Top1:'29.1(10.1)',
    },
    {
        key: '2',
        Network: 'mobilenet-v1-0.75',
        Flops: '317',
        Params:2.59,
        Top1:'31.6(11.8)',
    }, {
        key: '3',
        Network: 'mobilenet-v1-0.5',
        Flops: 150,
        Params:1.34,
        Top1:'36.7(15.1)',
    }, {
        key: '4',
        Network: 'mobilenet-v1-0.25',
        Flops: 41,
        Params:0.47,
        Top1:'50.2(25.8)',
    }, {
        key: '5',
        Network: 'mobilenet-v1-swish',
        Flops: 569,
        Params:4.24,
        Top1:'25.8(8.30)',
    },{
        key: '6',
        Network: 'mobilenet-v2',
        Flops: 300,
        Params:3.4,
        Top1:28.3,
    },{
        key: '7',
        Network: 'mobilenet-v2',
        Flops: 585,
        Params:6.9,
        Top1:25.3,
    },
    {
        key: '8',
        Network: 'shufflenet-2x-g3-se',
        Flops: 304,
        Params:3.18,
        Top1:33.78,
    }, {
        key: '9',
        Network: 'shufflenet-2x-g3',
        Flops: 351,
        Params:3.48,
        Top1:32.98,
    },
    {
        key: '10',
        Network: 'shufflenet-1.5x-g3',
        Flops: 351,
        Params:3.48,
        Top1:32.98,
    }, {
        key: '11',
        Network: 'shufflenet-1x-g8',
        Flops: 351,
        Params:3.48,
        Top1:33.30,
    },{
        key: '12',
        Network: 'resnet110',
        Flops: 247,
        Params:1.72,
        Top1:5.56,
    }, {
        key: '13',
        Network: 'resnet110-mixup',
        Flops: 247,
        Params:1.72,
        Top1:4.99,
    },
    {
        key: '14',
        Network: 'resnext29_8x64d-mixup',
        Flops: 5387,
        Params:34.5,
        Top1:2.92,
    }, {
        key: '15',
        Network: 'resnext29_8x64d',
        Flops: 5387,
        Params:34.5,
        Top1:3.91,
    },{
        key: '16',
        Network: 'crossnet62-e48e05',
        Flops: 304,
        Params:3.18,
        Top1:33.78,
    },{
        key: '17',
        Network: 'crossnet62-e64e05',
        Flops: 351,
        Params:3.48,
        Top1:32.98,
    },{
        key: '18',
        Network: 'crossnet47',
        Flops: 351,
        Params:3.48,
        Top1:32.98,
    },{
        key: '19',
        Network: 'crossnet47-dropout',
        Flops: 351,
        Params:3.48,
        Top1:33.30,
    },{
        key: '20',
        Network: 'nasnet-A',
        Flops: 304,
        Params:3.18,
        Top1:33.78,
    },{
        key: '21',
        Network: 'nasnet-B',
        Flops: 351,
        Params:3.48,
        Top1:32.98,
    },{
        key: '22',
        Network: 'nasnet-c',
        Flops: 351,
        Params:3.48,
        Top1:32.98,
    },{
        key: '23',
        Network: 'pnasnet-A',
        Flops: 351,
        Params:3.48,
        Top1:33.30,
    },
];

export let Classification_Image_table_data = [{'Network': 'mobilenet_v1_0.25', 'Flops': ' 567.7M', 'Params': ' 4.23M', 'speed': 0.008, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1nKTFXvBP0F0YZp8t9jv_wg', 'baidu_code': 'gqfa'}, 'Top1/Top5': ' 73.71/ 91.49'}, {'Network': 'mobilenet_v2_1.0_1.5x', 'Flops': ' 299.4M', 'Params': ' 3.50M', 'speed': 0.013, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1m7dQijA-e4bwVfRZoLzopQ', 'baidu_code': 'vc53'}, 'Top1/Top5': ' 71.87/ 90.28'}, {'Network': 'mobilenet_v3_large_0.4x', 'Flops': ' 214.0M', 'Params': ' 4.22M', 'speed': 0.018, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1DaxDsAdq55SGvDel0ohKNg', 'baidu_code': 'o5fg'}, 'Top1/Top5': ' 73.71/ 91.49'}, {'Network': 'mobilenet_v3_large_1.5x', 'Flops': ' 214.0M', 'Params': ' 4.22M', 'speed': 0.018, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1fEJiGmRa6FPwRPEhU1qxag', 'baidu_code': 'lyuq'}, 'Top1/Top5': ' 74.62/ 92.02'}, {'Network': 'aligned_hrnet_w48', 'Flops': ' 11699.8M', 'Params': ' 64.40M', 'speed': 0.124, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1jOADeJo8j3OuTfSQw4nAKg', 'baidu_code': '6z4j'}, 'Top1/Top5': ' 80.65/ 95.20'}, {'Network': 'se_aligned_hrnet_w48g_finetune_0.5x', 'Flops': ' 26242.19M', 'Params': ' 116.56M', 'speed': 0.144, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1jLefZh4asv8eLdRghJjn9w', 'baidu_code': '5sfh'}, 'Top1/Top5': ' 80.65/ 95.20'}, {'Network': 'se_hrnet_w32g_finetune_0.3x', 'Flops': ' 26242.19M', 'Params': ' 116.56M', 'speed': 0.114, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/17am4KbujEQhF8Rc82r2Lmg', 'baidu_code': 'cv9t'}, 'Top1/Top5': ' 80.65/ 95.20'}, {'Network': 'aligned_resnet50d', 'Flops': ' 6131.5M', 'Params': ' 38.45M', 'speed': 0.028, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1Xgdgx0VY4LYakB45Nl7FoQ', 'baidu_code': 'xd6l'}, 'Top1/Top5': ' 80.65/ 95.20'}, {'Network': 'resnet101d', 'Flops': ' 4326.8M', 'Params': ' 28.10M', 'speed': 0.028, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1WlypXUgAqq5M3rs6RQGWxQ', 'baidu_code': 'k5fl'}, 'Top1/Top5': ' 78.49/ 94.06'}, {'Network': 'resnet18d', 'Flops': ' 4326.8M', 'Params': ' 25.57M', 'speed': 0.008, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1BhmmKlg5hvPEt_ee8dSkcA', 'baidu_code': '9ydo'}, 'Top1/Top5': ' 77.5/ 93.90'}, {'Network': 'resnet34d', 'Flops': ' 4326.8M', 'Params': ' 25.57M', 'speed': 0.012, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1U0tIcloJOloxDPlp3XCdDQ', 'baidu_code': 'f72c'}, 'Top1/Top5': ' 77.5/ 93.90'}, {'Network': 'resnet50a', 'Flops': ' 3855.9M', 'Params': ' 25.55M', 'speed': 0.013, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1NXikuS8cz3gt8Zrau1hwNw', 'baidu_code': '1r6b'}, 'Top1/Top5': ' 77.5/ 93.90'}, {'Network': 'resnet50a_normal', 'Flops': ' 3855.9M', 'Params': ' 25.55M', 'speed': 0.016, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1CG1Jt7QZHZJwpeKU6hSmdg', 'baidu_code': 'p8or'}, 'Top1/Top5': ' 77.5/ 93.90'}, {'Network': 'resnet50b', 'Flops': ' 4087.1M', 'Params': ' 25.55M', 'speed': 0.016, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1eoGVgrXH2oV_D3Za953UfQ', 'baidu_code': 'usyp'}, 'Top1/Top5': ' 77.5/ 93.90'}, {'Network': 'resnet50c', 'Flops': ' 4326.8M', 'Params': ' 25.57M', 'speed': 0.015, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/109HgDPLAjRd6P6QKNyldlw', 'baidu_code': '7u4c'}, 'Top1/Top5': ' 77.5/ 93.90'}, {'Network': 'resnet50d', 'Flops': ' 4326.8M', 'Params': ' 28.10M', 'speed': 0.015, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1dcP0Z8p5Yb1RplcywyfKcQ', 'baidu_code': 'cnxs'}, 'Top1/Top5': ' 77.5/ 93.90'}, {'Network': 'aligned_resnext101d_32x4d', 'Flops': ' 11699.8M', 'Params': ' 64.40M', 'speed': 0.074, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1xm1v03dE53DcdPTlvAlShw', 'baidu_code': 'fiyk'}, 'Top1/Top5': ' 77.5/ 93.90'}, {'Network': 'resnext101d_32x4d', 'Flops': ' 4468.07M', 'Params': ' 25.04M', 'speed': 0.038, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1YNQuJFYi5nsyXaT1x-4Mcg', 'baidu_code': 'wrx7'}, 'Top1/Top5': ' 79.17/ 94.44'}, {'Network': 'resnext50d_32x4d', 'Flops': ' 4468.07M', 'Params': ' 25.04M', 'speed': 0.024, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1ld9CblCXJybajh5kGGdxhw', 'baidu_code': 'q1fu'}, 'Top1/Top5': ' 80.45/ 95.13'}]


export let Classification_Image_detail_table_data = [
    //Network Params Flops Top1/Top5
    ['ResNet18_v1 1', 4.24, 569,'70.93/89.92', 'https://pytorch.org/'],
    ['ResNet34_v1 1', 2.59, '317', '74.37/91.87',],
    ['ResNet50_v1 1', 1.34, '150', '77.36/93.57',],
    ['ResNet50_v1_int8 1', 4.24, '569','76.86/93.46'],
    ['ResNet101_v1 1', 2.59, '317', '78.34/94.01', ],
    ['ResNet152_v1 1', 1.34, '150', '79.22/94.64', ],
    ['ResNet18_v1b 1', 4.24, '569', '70.94/89.83', ],
    ['ResNet34_v1b 1', 2.59, '317', '74.65/92.08', ],
    ['ResNet50_v1b 1', 1.34, '150', '77.67/93.82', ],
    ['ResNet50_v1b_gn 1', 4.24, '569', '77.36/93.59', ],
    ['ResNet101_v1b 1', 2.59, '317', '79.2/94.61', ],
    ['ResNet152_v1b 1', 1.34, '150', '79.69/94.74', ],
    ['ResNet50_v1c 1', 4.24, '569', '78.03/94.09', ],
    ['ResNet101_v1c 1', 2.59, '317', '79.6/94.75', ],
    ['ResNet152_v1c 1', 1.34, '150', '80.01/94.96', ],
    ['ResNet50_v1d 1', 4.24, '569', '79.15/94.58', ],
    ['ResNet50_v1d 1', 2.59, '317', '78.48/94.2', ],
    ['ResNet101_v1d 1', 1.34, '150', '80.51/95.12', ],
    ['ResNet101_v1d 1', 4.24, '569', '79.78/94.8', ],
    ['ResNet152_v1d 1', 2.59, '317', '80.61/95.34', ],
    ['ResNet152_v1d 1', 1.34, '150', '80.26/95', ],
    ['ResNet18_v2 2', 4.24, '569', '71/89.92', ],
    ['ResNet34_v2 2', 2.59, '317', '74.4/92.08', ],
    ['ResNet50_v2 2', 1.34, '150', '77.11/93.43', ],
    ['ResNet101_v2 2', 4.24, '569', '78.53/94.17', ],
    ['ResNet152_v2 2', 2.59, '317', '79.32/94.53', ],
    ['ResNext50_32x4d 12', 1.34, '150', '80.37/95.06', ],
    ['ResNext101_32x4d 12', 4.24, '569', '80.69/95.17', ],
    ['ResNext101_64x4d_v1 12', 2.59, '317', '79.95/94.93', ],
    ['SE_ResNext50_32x4d ', 2.59, '150', '80.91/95.39', ],
    ['SE_ResNext101_32x4d', 1.34, '317', '81.01/80.91', ],
    ['SE_ResNext101_64x4d', 4.24, '150', '80.91/80.91', ],
    ['SE_ResNext101_64x4d', 4.24, '150', '80.91/80.91', ]
];

export let Classification_Cifar_detail_table_data = [];


//3rd_table

export let Classification_Image_3rd_table_data = [{'Network': 'alexnet', 'Flops': ' 655.56M', 'Params': ' 61.1M', 'speed': 0.003, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1j1BvJcdKZaxX5gTM6HtiyQ', 'baidu_code': 'q5lh'}, 'Top1/Top5': ' 56.52/ 79.06', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'dla34', 'Flops': ' 3072.3M', 'Params': ' 15.78M', 'speed': 0.014, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1hiYikZp-4MPIm4MNqgfPMw', 'baidu_code': 'qlj5'}, 'Top1/Top5': ' 74.63/ 92.06', 'source': ['https://github.com/ucbdrive/dla', 'official']}, {'Network': 'dla46_c', 'Flops': ' 575.6M', 'Params': ' 1.30M', 'speed': 0.015, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1dtCkO7b32GgpOSF5HMmYMQ', 'baidu_code': '946l'}, 'Top1/Top5': ' 64.87/ 86.28', 'source': ['https://github.com/ucbdrive/dla', 'official']}, {'Network': 'dla46x_c', 'Flops': ' 534.0M', 'Params': ' 1.07M', 'speed': 0.018, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1EOGNt-cqTSkpKs2L9b-XKw', 'baidu_code': 'nest'}, 'Top1/Top5': ' 65.98/ 86.98', 'source': ['https://github.com/ucbdrive/dla', 'official']}, {'Network': 'dla60', 'Flops': ' 4311.9M', 'Params': ' 22.33M', 'speed': 0.022, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1jl3EDySXYuxaB2hlObEQxw', 'baidu_code': '3qyj'}, 'Top1/Top5': ' 77.02/ 93.30', 'source': ['https://github.com/ucbdrive/dla', 'official']}, {'Network': 'dla60x_c', 'Flops': ' 584.2M', 'Params': ' 1.33M', 'speed': 0.023, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/18SZtOivFeR0k-1ww1lvY_g', 'baidu_code': 'lgmw'}, 'Top1/Top5': ' 67.90/ 88.43', 'source': ['https://github.com/ucbdrive/dla', 'official']}, {'Network': 'dla60x', 'Flops': ' 3592.6M', 'Params': ' 17.64M', 'speed': 0.022, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1VCCsn178poWQDPLSxXZHnQ', 'baidu_code': '35qf'}, 'Top1/Top5': ' 78.24/ 94.02', 'source': ['https://github.com/ucbdrive/dla', 'official']}, {'Network': 'dla102', 'Flops': ' 7291.9M', 'Params': ' 33.73M', 'speed': 0.034, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1qwXhqstqo9bBhteR9w4IbA', 'baidu_code': 'i64k'}, 'Top1/Top5': ' 78.02/ 93.95', 'source': ['https://github.com/ucbdrive/dla', 'official']}, {'Network': 'dla102x2', 'Flops': ' 9411.4M', 'Params': ' 41.74M', 'speed': 0.055, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1WHD-758ep_9u2OhqUaYVgQ', 'baidu_code': 'w4d3'}, 'Top1/Top5': ' 79.45/ 94.64', 'source': ['https://github.com/ucbdrive/dla', 'official']}, {'Network': 'dla102x', 'Flops': ' 5975.3M', 'Params': ' 26.77M', 'speed': 0.031, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1TxrwV3M763UkoQwD8pWduA', 'baidu_code': '5jpa'}, 'Top1/Top5': ' 78.50/ 94.23', 'source': ['https://github.com/ucbdrive/dla', 'official']}, {'Network': 'dla169', 'Flops': ' 11723.5M', 'Params': ' 53.98M', 'speed': 0.046, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1xrVbj_C6f-JthuIHTZEX_Q', 'baidu_code': 'du1h'}, 'Top1/Top5': ' 78.71/ 94.33', 'source': ['https://github.com/ucbdrive/dla', 'official']}, {'Network': 'efficientnet_b0', 'Flops': ' 373.2M', 'Params': ' 5.28M', 'speed': 0.021, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1VdO71zuOEou4yppdomyYWg', 'baidu_code': 'w4yb'}, 'Top1/Top5': ' 75.78/ 92.74', 'source': ['https://github.com/tensorflow/tpu/tree/master/models/official/efficientnet', 'official']}, {'Network': 'fairnas_a', 'Flops': ' 386.8M', 'Params': ' 4.65M', 'speed': 0.014, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/18mXxDoXzPX7ytjHPytS-0A', 'baidu_code': 'myi9'}, 'Top1/Top5': ' 75.32/ 92.38', 'source': ['https://github.com/fairnas/FairNAS', 'official']}, {'Network': 'fairnas_b', 'Flops': ' 344.0M', 'Params': ' 4.50M', 'speed': 0.014, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1opqfSZ8PIuvBAYqQ_3w7Ww', 'baidu_code': 'fdfj'}, 'Top1/Top5': ' 75.13/ 92.31', 'source': ['https://github.com/fairnas/FairNAS', 'official']}, {'Network': 'fairnas_c', 'Flops': ' 319.7M', 'Params': ' 4.39M', 'speed': 0.014, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1qHesq6vNez7uQ36OWUVZ0g', 'baidu_code': 'ghdv'}, 'Top1/Top5': ' 74.67/ 92.13', 'source': ['https://github.com/fairnas/FairNAS', 'official']}, {'Network': 'fbnet_c', 'Flops': ' 382.9M', 'Params': ' 5.57M', 'speed': 0.016, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1PFNFBTHT2IngCHV8w6y8YQ', 'baidu_code': 'xv3i'}, 'Top1/Top5': ' 75.12/ 92.38', 'source': ['https://github.com/rwightman/pytorch-image-models', 'rwightman']}, {'Network': 'hrnet_w18', 'Flops': ' 4281.4M', 'Params': ' 21.29M', 'speed': 0.085, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1dJlCJRoZH3lwr3R1eo6rZw', 'baidu_code': 'xu4x'}, 'Top1/Top5': ' 76.75/ 93.44', 'source': ['https://github.com/HRNet/HRNet-Image-Classification', 'official']}, {'Network': 'hrnet_w30', 'Flops': ' 8103.7M', 'Params': ' 37.71M', 'speed': 0.078, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1bhIW9eLle_Fz2nGy2QVWhA', 'baidu_code': 'kcyv'}, 'Top1/Top5': ' 78.19/ 94.22', 'source': ['https://github.com/HRNet/HRNet-Image-Classification', 'official']}, {'Network': 'hrnet_w32', 'Flops': ' 8919.0M', 'Params': ' 41.23M', 'speed': 0.066, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/19fiYAJMwq5hk5y5xPO7N6A', 'baidu_code': 'm096'}, 'Top1/Top5': ' 78.44/ 94.18', 'source': ['https://github.com/HRNet/HRNet-Image-Classification', 'official']}, {'Network': 'hrnet_w40', 'Flops': ' 12689.9M', 'Params': ' 57.55M', 'speed': 0.083, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/13sVOn571jmg437DIR3xvWw', 'baidu_code': 'ze6l'}, 'Top1/Top5': ' 78.93/ 94.46', 'source': ['https://github.com/HRNet/HRNet-Image-Classification', 'official']}, {'Network': 'hrnet_w44', 'Flops': ' 14881.0M', 'Params': ' 67.06M', 'speed': 0.068, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1Sal8dbcHbyT5KjfW309GKQ', 'baidu_code': 'vbl1'}, 'Top1/Top5': ' 78.89/ 94.37', 'source': ['https://github.com/HRNet/HRNet-Image-Classification', 'official']}, {'Network': 'hrnet_w48', 'Flops': ' 17275.9M', 'Params': ' 77.46M', 'speed': 0.083, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1ptxl4YkKDXiESOYv53j7QQ', 'baidu_code': 'qdmo'}, 'Top1/Top5': ' 79.31/ 94.51', 'source': ['https://github.com/HRNet/HRNet-Image-Classification', 'official']}, {'Network': 'hrnet_w64', 'Flops': ' 28893.3M', 'Params': ' 128.05M', 'speed': 0.078, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1ic53PjQB0tACjI5PbcNzCg', 'baidu_code': 'c1j2'}, 'Top1/Top5': ' 79.47/ 94.65', 'source': ['https://github.com/HRNet/HRNet-Image-Classification', 'official']}, {'Network': 'inception_v1', 'Flops': ' 1497.3M', 'Params': ' 6.62M', 'speed': 0.018, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/19YxMuMLjhp41j8MtCOrhGA', 'baidu_code': '7log'}, 'Top1/Top5': ' 69.78/ 89.53', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'inception_v3', 'Flops': ' 5711.1M', 'Params': ' 23.83M', 'speed': 0.028, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1zPbFbaxvxesU_FaTI7mA-g', 'baidu_code': 'rvnh'}, 'Top1/Top5': ' 77.49/ 93.56', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'inception_v4', 'Flops': ' 12252.4M', 'Params': ' 42.67M', 'speed': 0.046, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1UVf40JUj8pkVJeJUVgC1lg', 'baidu_code': 'xxa9'}, 'Top1/Top5': ' 80.13/ 94.92', 'source': ['https://github.com/Cadene/pretrained-models.pytorch', 'cadene']}, {'Network': 'inception_resnet_v2', 'Flops': ' 13154.2M', 'Params': ' 55.84M', 'speed': 0.056, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/15s6XfSAxPFP14-eqvo3F3g', 'baidu_code': 'nb4u'}, 'Top1/Top5': ' 80.30/ 95.25', 'source': ['https://github.com/Cadene/pretrained-models.pytorch', 'cadene']}, {'Network': 'mnasnet_a1', 'Flops': ' 310.2M', 'Params': ' 3.88M', 'speed': 0.017, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/17PnIGxdqYtlUGvZerDopJA', 'baidu_code': 'n1yo'}, 'Top1/Top5': ' 75.33/ 92.56', 'source': ['https://github.com/rwightman/pytorch-image-models', 'rwightman']}, {'Network': 'mnasnet_b1', 'Flops': ' 313.1M', 'Params': ' 4.38M', 'speed': 0.013, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1S9M5lm0UoYdbbM4YPyjrEw', 'baidu_code': 'ss2l'}, 'Top1/Top5': ' 74.61/ 92.16', 'source': ['https://github.com/rwightman/pytorch-image-models', 'rwightman']}, {'Network': 'mnasnet_b1', 'Flops': ' 313.1M', 'Params': ' 4.38M', 'speed': 0.012, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1ftwfA6mqXba5ENTV9sm9ew', 'baidu_code': 'cvg9'}, 'Top1/Top5': ' 73.45/ 91.51', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'mobilenet_v2_1.0', 'Flops': ' 299.4M', 'Params': ' 3.50M', 'speed': 0.014, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1jglpPuQDaJWzfDE4G-0HZw', 'baidu_code': 'g7m3'}, 'Top1/Top5': ' 71.87/ 90.28', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'mobilenet_v3_large', 'Flops': ' 215.3M', 'Params': ' 5.47M', 'speed': 0.017, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1nMR7hKO-kk965y6gsAHz8Q', 'baidu_code': '32oh'}, 'Top1/Top5': ' 75.44/ 92.65', 'source': ['https://github.com/rwightman/pytorch-image-models', 'rwightman']}, {'Network': 'moga_a', 'Flops': ' 302.7M', 'Params': ' 5.15M', 'speed': 0.019, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/17-galMay6aiIV2Vh_fc__g', 'baidu_code': 'jn5q'}, 'Top1/Top5': ' 75.85/ 92.79', 'source': ['https://github.com/xiaomi-automl/MoGA', 'official']}, {'Network': 'moga_b', 'Flops': ' 247.3M', 'Params': ' 5.50M', 'speed': 0.018, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/16nyg7TG5jo6sEclOnWniVA', 'baidu_code': '7brg'}, 'Top1/Top5': ' 75.54/ 92.58', 'source': ['https://github.com/xiaomi-automl/MoGA', 'official']}, {'Network': 'moga_c', 'Flops': ' 219.8M', 'Params': ' 5.48M', 'speed': 0.017, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1hI2fRhN878T1eRhUxKAYlQ', 'baidu_code': 'mrr8'}, 'Top1/Top5': ' 75.31/ 92.48', 'source': ['https://github.com/xiaomi-automl/MoGA', 'official']}, {'Network': 'peleenet', 'Flops': ' 507.0M', 'Params': ' 2.80M', 'speed': 0.025, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1UyM3CRA2TuWYTfLiF1jl8g', 'baidu_code': '9jgu'}, 'Top1/Top5': ' 72.08/ 90.64', 'source': ['https://github.com/Robert-JunWang/PeleeNet', 'official']}, {'Network': 'proxylessnas_cpu', 'Flops': ' 437.8M', 'Params': ' 4.36M', 'speed': 0.015, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1_eBkxxU0YrF52SA_phTQkg', 'baidu_code': 'nnd7'}, 'Top1/Top5': ' 75.29/ 92.39', 'source': ['https://github.com/mit-han-lab/ProxylessNAS/tree/master', 'official']}, {'Network': 'proxylessnas_gpu', 'Flops': ' 463.5M', 'Params': ' 7.11M', 'speed': 0.011, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1NJVHZTJlLx9sizbgTZURjA', 'baidu_code': 'n5o3'}, 'Top1/Top5': ' 75.08/ 92.53', 'source': ['https://github.com/mit-han-lab/ProxylessNAS/tree/master', 'official']}, {'Network': 'proxylessnas_mobile', 'Flops': ' 319.1M', 'Params': ' 4.08M', 'speed': 0.014, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/17pvky0KQncPXUvGFEeFqSg', 'baidu_code': 'ljqa'}, 'Top1/Top5': ' 74.59/ 92.20', 'source': ['https://github.com/mit-han-lab/ProxylessNAS/tree/master', 'official']}, {'Network': 'resnet18b', 'Flops': ' 1813.5M', 'Params': ' 11.68M', 'speed': 0.007, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1W_KJucErBMkoQ7Jvf5Zuyg', 'baidu_code': 'pdwb'}, 'Top1/Top5': ' 69.75/ 89.07', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'resnet34b', 'Flops': ' 3663.2M', 'Params': ' 21.79M', 'speed': 0.013, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/12BaUv7S0pW7giCqbp8DIiQ', 'baidu_code': 'g12y'}, 'Top1/Top5': ' 73.31/ 91.42', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'resnet50a', 'Flops': ' 3855.9M', 'Params': ' 25.55M', 'speed': 0.014, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1NkqEd-lRBnEO1LSfA3R00A', 'baidu_code': 'tx5'}, 'Top1/Top5': ' 61.30/ 84.18', 'source': ['https://github.com/KaimingHe/deep-residual-networks', 'caffe']}, {'Network': 'resnet50b-gn', 'Flops': ' 4087.1M', 'Params': ' 25.55M', 'speed': 0.017, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1DolMh9qyuuCL27ktbWaVlg', 'baidu_code': 'w1ev'}, 'Top1/Top5': ' 59.91/ 83.61', 'source': ['https://github.com/facebookresearch/Detectron/tree/master/projects/GN', 'caffe2']}, {'Network': 'resnet50b_128d', 'Flops': ' 11395.9M', 'Params': ' 68.88M', 'speed': 0.017, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1SPwXVNS6aQrQIJMVOcMAfA', 'baidu_code': '38aq'}, 'Top1/Top5': ' 78.46/ 94.08', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'resnet50b', 'Flops': ' 4087.1M', 'Params': ' 25.55M', 'speed': 0.017, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1uHo4slVo0AQPNrqzr-4Vqw', 'baidu_code': 'dqi7'}, 'Top1/Top5': ' 76.13/ 92.86', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'resnet101a', 'Flops': ' 7568.1M', 'Params': ' 44.54M', 'speed': 0.029, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/195f3gxBAGcKHD9J5sTmr1w', 'baidu_code': 'au5d'}, 'Top1/Top5': ' 63.10/ 85.57', 'source': ['https://github.com/KaimingHe/deep-residual-networks', 'caffe']}, {'Network': 'resnet101b_128d', 'Flops': ' 22751.0M', 'Params': ' 126.88M', 'speed': 0.025, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1SN1CbXm2_vahWtmcIZxDxw', 'baidu_code': 'lqoa'}, 'Top1/Top5': ' 78.84/ 94.28', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'resnet101b', 'Flops': ' 7799.3M', 'Params': ' 44.54M', 'speed': 0.027, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1ALcfLjCIgFHW-gep-SmQDg', 'baidu_code': '0h2b'}, 'Top1/Top5': ' 77.37/ 93.54', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'resnet152a', 'Flops': ' 11280.3M', 'Params': ' 60.19M', 'speed': 0.041, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1P69wDcBwAILedNC9mhGvCw', 'baidu_code': 'im16'}, 'Top1/Top5': ' 63.12/ 85.61', 'source': ['https://github.com/KaimingHe/deep-residual-networks', 'caffe']}, {'Network': 'resnet152b', 'Flops': ' 11511.5M', 'Params': ' 60.19M', 'speed': 0.042, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1op9gUY7mRowuvfGBNFbbzQ', 'baidu_code': 'mrdi'}, 'Top1/Top5': ' 78.31/ 94.04', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'resnext50b_32x4d', 'Flops': ' 4228.4M', 'Params': ' 25.02M', 'speed': 0.022, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/14Ms61EPD3X846zAgllkRwA', 'baidu_code': 'wd7a'}, 'Top1/Top5': ' 77.61/ 93.69', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'resnext101b_32x16d', 'Flops': ' 36161.24M', 'Params': ' 194.02M', 'speed': 0.042, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1c98jyeox204j98wJQ40XoA', 'baidu_code': 'lu8w'}, 'Top1/Top5': ' 84.17/ 97.19', 'source': ['https://github.com/facebookresearch/WSL-Images', 'wsp']}, {'Network': 'resnext101b_32x32d', 'Flops': ' 87104.73M', 'Params': ' 468.53M', 'speed': 0.043, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1q3OLCrXEOOfOgicxiJh1OQ', 'baidu_code': 'fv4u'}, 'Top1/Top5': ' 85.09/ 97.43', 'source': ['https://github.com/facebookresearch/WSL-Images', 'wsp']}, {'Network': 'resnext101b_32x48d', 'Flops': ' 153308.15M', 'Params': ' 828.41M', 'speed': 0.046, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1IC65ST8gwUoZGK6npG-vnQ', 'baidu_code': '7skg'}, 'Top1/Top5': ' 85.44/ 97.57', 'source': ['https://github.com/facebookresearch/WSL-Images', 'official']}, {'Network': 'resnext101b_32x4d', 'Flops': ' 7967.9M', 'Params': ' 44.17M', 'speed': 0.039, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1IAehCW6uhslhr30Gq-5Szw', 'baidu_code': 'oisd'}, 'Top1/Top5': ' 78.18/ 93.88', 'source': ['https://github.com/facebookresearch/ResNeXt', 'official']}, {'Network': 'resnext101b_32x8d', 'Flops': ' 16411.96M', 'Params': ' 88.79M', 'speed': 0.039, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1kdekvfFCbb0z4uW2OhuokQ', 'baidu_code': 'm2eq'}, 'Top1/Top5': ' 79.31/ 94.52', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'resnext101b_32x8d', 'Flops': ' 16411.96M', 'Params': ' 88.79M', 'speed': 0.034, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1etfaJ_JAkvlgDEZKx2OqfA', 'baidu_code': 'qi9j'}, 'Top1/Top5': ' 82.68/ 96.63', 'source': ['https://github.com/facebookresearch/WSL-Images', 'wsp']}, {'Network': 'resnext101b_64x4d', 'Flops': ' 15458.2M', 'Params': ' 83.45M', 'speed': 0.057, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1u31qN8NEI1yiuGoAsgd_8Q', 'baidu_code': 'ukwr'}, 'Top1/Top5': ' 78.95/ 94.25', 'source': ['https://github.com/facebookresearch/ResNeXt', 'official']}, {'Network': 'se_resnext26b_32x4d', 'Flops': ' 2468.6M', 'Params': ' 16.79M', 'speed': 0.016, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1kyreXt87y8GEzJ-kyAq0zQ', 'baidu_code': 'lxwc'}, 'Top1/Top5': ' 76.55/ 93.06', 'source': ['https://github.com/rwightman/pytorch-image-models', 'rwightman']}, {'Network': 'shufflenet_v2_0.5', 'Flops': ' 39.45M', 'Params': ' 1.36M', 'speed': 0.015, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1QbRtvujPlX1Zh5vG-idPYw', 'baidu_code': 'u399'}, 'Top1/Top5': ' 60.63/ 82.23', 'source': ['https://github.com/megvii-model/ShuffleNet-Series', 'official']}, {'Network': 'shufflenet_v2_1.0', 'Flops': ' 144.8M', 'Params': ' 2.27M', 'speed': 0.015, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1VVx4zj83953vuh5VEOWOLA', 'baidu_code': 's5ud'}, 'Top1/Top5': ' 69.11/ 88.49', 'source': ['https://github.com/megvii-model/ShuffleNet-Series', 'official']}, {'Network': 'shufflenet_v2_1.5', 'Flops': ' 297.9M', 'Params': ' 3.50M', 'speed': 0.016, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/160EgqYcXI3hy3q5z_-BroA', 'baidu_code': 'lzls'}, 'Top1/Top5': ' 72.34/ 90.37', 'source': ['https://github.com/megvii-model/ShuffleNet-Series', 'official']}, {'Network': 'shufflenet_v2_2.0', 'Flops': ' 588.7M', 'Params': ' 7.40M', 'speed': 0.015, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1a62ljKgDWNW9FcK0z4WC-Q', 'baidu_code': '60zo'}, 'Top1/Top5': ' 74.90/ 92.27', 'source': ['https://github.com/megvii-model/ShuffleNet-Series', 'official']}, {'Network': 'spnasnet', 'Flops': ' 332.1M', 'Params': ' 4.42M', 'speed': 0.016, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1z3l9aMtTycAz7lEr28oEeA', 'baidu_code': '0qb2'}, 'Top1/Top5': ' 74.08/ 91.83', 'source': ['https://github.com/rwightman/pytorch-image-models', 'rwightman']}, {'Network': 'vgg11', 'Flops': ' 7485.4M', 'Params': ' 132.8M', 'speed': 0.004, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1DvDiATodx9kKHLDAT8rLzQ', 'baidu_code': 'xcme'}, 'Top1/Top5': ' 69.02/ 88.62', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'vgg11bn', 'Flops': ' 7485.4M', 'Params': ' 132.8M', 'speed': 0.005, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1nUrtewpYbrmgDTzOrNdPLQ', 'baidu_code': '422v'}, 'Top1/Top5': ' 70.37/ 89.81', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'vgg13', 'Flops': ' 11184.8M', 'Params': ' 133.0M', 'speed': 0.004, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1_iwkfZwKenBv61p1eT17rw', 'baidu_code': '9t1e'}, 'Top1/Top5': ' 69.92/ 89.24', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'vgg13bn', 'Flops': ' 11184.8M', 'Params': ' 133.0M', 'speed': 0.005, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1Lawg22Szdrcl29vNGlf0Gw', 'baidu_code': 's2vo'}, 'Top1/Top5': ' 71.58/ 90.37', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'vgg16', 'Flops': ' 15346.6M', 'Params': ' 138.3M', 'speed': 0.005, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1TNz58bYbmiomvtQT8u3c-g', 'baidu_code': '8yw8'}, 'Top1/Top5': ' 71.59/ 90.38', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'vgg16bn', 'Flops': ' 15346.6M', 'Params': ' 138.3M', 'speed': 0.006, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1d05YePne3CpqbAxJfgFWng', 'baidu_code': 'iaan'}, 'Top1/Top5': ' 73.36/ 91.51', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'vgg19', 'Flops': ' 19508.4M', 'Params': ' 143.6M', 'speed': 0.005, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1qMrdJwKDiPJJ9VIGJ6TrbA', 'baidu_code': '6zak'}, 'Top1/Top5': ' 72.37/ 90.87', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'vgg19bn', 'Flops': ' 19508.4M', 'Params': ' 143.6M', 'speed': 0.007, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/10BNM93ciHJYbcKtejT1dwg', 'baidu_code': 'boj5'}, 'Top1/Top5': ' 74.21/ 91.84', 'source': ['https://github.com/pytorch/vision', 'torchvision']}, {'Network': 'vovnet37', 'Flops': ' 7071.2M', 'Params': ' 22.60M', 'speed': 0.013, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1BY1RnQR4l2HFAW0ylSYm0Q', 'baidu_code': '953h'}, 'Top1/Top5': ' 76.77/ 93.43', 'source': ['https://github.com/stigma0617/VoVNet.pytorch', 'stigma']}, {'Network': 'vovnet57', 'Flops': ' 8929.1M', 'Params': ' 36.64M', 'speed': 0.018, 'type': 1.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1mAn4f6UB8Vhkhkfm4oSNQQ', 'baidu_code': 'ees4'}, 'Top1/Top5': ' 77.73/ 93.71', 'source': ['https://github.com/stigma0617/VoVNet.pytorch', 'stigma']}, {'Network': 'xception', 'Flops': ' 8355.3M', 'Params': ' 22.85M', 'speed': 0.013, 'type': 0.0, 'download': {'baidu_download': 'https://pan.baidu.com/s/1i2RuEhZPkS614PInCZ_wIw', 'baidu_code': 'o4vq'}, 'Top1/Top5': ' 78.88/ 94.29', 'source': ['https://github.com/Cadene/pretrained-models.pytorch', 'cadene']}]