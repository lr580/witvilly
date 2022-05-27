const surname = ['桂', '郜', '庄', '苏', '敖', '满', '农', '冀', '伊', '谢', '漕', '糜', '申', '羿', '党', '郁', '逯', '宁', '蒲', '家', '董', '厍', '班', '罗', '那', '汪', '蔡', '于', '傅', '晏', '桓', '连', '甘', '阎', '冉', '田', '卢', '相', '慕', '孔', '任', '夏', '劳', '潘', '扶', '钭', '文', '方', '曹', '毛', '须', '暨', '钟', '谭', '饶', '黎', '萧', '陆', '宦', '乌', '武', '仰', '梁', '瞿', '车', '杜', '杨', '关', '韶', '程', '余', '芮', '祖', '闻', '殳', '詹', '富', '宋', '冯', '边', '吴', '邰', '弓', '陈', '简', '贡', '阚', '高', '蓟', '隗', '张', '蒋', '雍', '游', '终', '姜', '苍', '邓', '崔', '孟', '廖', '通', '景', '龚', '茹', '辛', '勾', '万', '蒙', '寿', '尚', '鄂', '沈', '宫', '菱', '焦', '牛', '康', '濮', '双', '王', '甄', '刘', '耿', '惠', '靳', '利', '钱', '古', '薛', '怀', '宿', '庾', '温', '逢', '白', '衡', '权', '浦', '林', '向', '汤', '金', '赖', '袁', '史', '晃', '戈', '鱼', '韩', '訾', '范', '曾', '松', '毋', '寇', '池', '郏', '牧', '郭', '乜', '魏', '周', '宰', '邵', '蔚', '弘', '居', '符', '容', '邱', '从', '江', '厉', '汲', '尹', '戴', '幸', '充', '邹', '养', '许', '阙', '籍', '巴', '李', '阴', '乔', '咸', '赵', '翟', '束', '石', '司', '顾', '越', '聂', '堵', '盖', '冷', '红', '蓬', '吕', '欧', '郝', '能', '朱', '郑', '慎', '唐', '丁', '莘', '融', '师', '孙', '扈', '秦', '卓', '广', '禄', '胡', '燕', '马', '习', '沃', '步', '巢', '徐', '后', '侯', '熊', '邴', '谷', '空', '储', '暴', '贾', '益', '叶', '黄', '国', '戌', '何', '索', '宓', '麴', '贺', '彭', '璩', '郗', '龙', '蒯', '姚', '段', '印', '易', '隆', '屠', '公', '常'];
const name_male = ['夫', '飇', '深', '洲', '家', '章', '春', '壁', '宣', '志', '璧', '珺', '乐', '君', '作', '才', '晋', '焱', '黎', '宾', '峰', '尧', '羽', '复', '健', '礼', '波', '果', '韶', '祖', '富', '曜', '气', '源', '煦', '意', '纶', '济', '伯', '清', '干', '魁', '游', '赡', '锐', '寿', '辉', '穹', '驰', '墨', '康', '圣', '豪', '琪', '厚', '荣', '朗', '裕', '奇', '熠', '瀚', '彬', '弘', '亮', '炫', '河', '生', '博', '昊', '季', '英', '飙', '溥', '绍', '嘉', '苑', '斌', '晨', '项', '人', '昌', '卿', '咏', '禄', '可', '俊', '空', '壮', '国', '蓄', '良', '展', '洽', '庸', '昶', '智', '蔼', '旺', '韵', '鹏', '瑞', '靖', '艾', '卫', '畴', '正', '迈', '赋', '晏', '思', '海', '淼', '驹', '扬', '玮', '盛', '举', '友', '旭', '达', '巍', '火', '烨', '喆', '方', '涉', '秉', '轩', '藻', '灿', '畅', '昂', '开', '纵', '爽', '路', '澹', '育', '好', '日', '纬', '悦', '理', '腾', '勋', '湃', '德', '顺', '云', '泽', '嗣', '勇', '惠', '薄', '庆', '温', '化', '茗', '林', '胜', '向', '阑', '杰', '焕', '曾', '民', '茂', '水', '立', '锋', '阔', '容', '旷', '凯', '煜', '炳', '鸥', '石', '艺', '成', '安', '恩', '钧', '乾', '宜', '玉', '修', '发', '昕', '掣', '熙', '龙', '树', '易', '儒', '专', '恺', '青', '永', '名', '贤', '滨', '振', '阳', '澍', '经', '晗', '辰', '夏', '文', '子', '叡', '捷', '洁', '义', '慈', '奕', '默', '程', '宇', '颂', '新', '毅', '风', '希', '瑜', '雅', '蕴', '漠', '澜', '格', '奥', '峯', '萌', '勤', '邦', '雨', '景', '鸿', '禹', '宝', '平', '尚', '知', '懿', '双', '雪', '沉', '藏', '哲', '行', '华', '尘', '怿', '邈', '赐', '范', '晖', '语', '佑', '烁', '谊', '天', '群', '鹍', '启', '临', '翼', '欣', '炎', '资', '冠', '慨', '翰', '业', '年', '超', '悌', '图', '广', '霖', '刚', '自', '忍', '益', '剑', '元', '鸣', '州', '旻', '聪', '颖', '霁', '坚', '运', '工', '和', '宁', '然', '明', '弼', '郎', '木', '涵', '材', '远', '真', '舟', '宏', '寒', '基', '赫', '阵', '祺', '彦', '光', '为', '觉', '浩', '耀', '美', '敏', '承', '兴', '雄', '武', '致', '飞', '睿', '同', '初', '建', '逸', '精', '祯', '简', '高', '全', '书', '豫', '力', '彩', '兆', '心', '诚', '原', '伟', '硕', '白', '翔', '昱', '锦', '誉', '泉', '松', '学', '池', '言', '信', '福', '怡', '峻', '实', '歌', '山', '骥', '栋', '星', '采', '本', '祥', '定', '侠', '湛', '卓', '泰', '丰', '翮', '宸', '量', '渊', '衍', '仙', '亘', '彭', '宕', '斯', '仁'];
const name_female = ['惋', '彤', '苏', '樱', '菊', '洲', '婕', '家', '米', '寄', '香', '望', '七', '荏', '春', '雁', '琴', '倡', '芝', '宣', '伽', '娇', '甘', '珺', '会', '菁', '乐', '枫', '淳', '君', '幼', '钊', '晰', '以', '羽', '岚', '月', '波', '琇', '韶', '问', '珊', '祖', '献', '富', '琼', '殷', '映', '煦', '意', '合', '丽', '漫', '清', '影', '情', '宵', '晓', '玟', '巧', '琪', '旋', '怀', '欢', '吟', '羙', '韦', '芸', '柏', '荣', '怜', '裕', '奇', '亚', '词', '惜', '痴', '芙', '秀', '弘', '笑', '柳', '河', '博', '赞', '虹', '英', '菲', '蕊', '嘉', '溪', '梓', '荃', '束', '冰', '晨', '茵', '佳', '小', '人', '曲', '韫', '融', '绣', '卿', '芦', '秋', '臻', '可', '弥', '槐', '国', '良', '凝', '泯', '俨', '姚', '长', '馥', '娅', '桂', '又', '昶', '应', '萍', '桐', '智', '霞', '韵', '葵', '瑞', '靖', '艾', '正', '湘', '露', '妹', '微', '忆', '晏', '漾', '思', '淼', '海', '田', '玮', '夜', '友', '旭', '南', '方', '抒', '一', '千', '轩', '畅', '杨', '儿', '余', '俏', '路', '芮', '玲', '倩', '瑶', '钰', '齐', '爱', '优', '娴', '颜', '艳', '悦', '娟', '寻', '访', '绫', '浅', '云', '泽', '园', '惠', '梅', '丹', '仪', '三', '舞', '茗', '胜', '妍', '向', '珑', '馨', '杰', '妮', '蕙', '曾', '莹', '湉', '水', '容', '从', '棠', '典', '井', '晶', '蓉', '许', '如', '咸', '石', '艺', '成', '安', '恩', '丝', '蔓', '沁', '芹', '半', '霜', '宜', '陶', '愉', '花', '玉', '多', '琬', '忻', '暮', '童', '爰', '琳', '修', '溶', '迷', '恨', '熙', '薇', '龙', '树', '瑛', '谧', '易', '专', '恺', '梦', '端', '荷', '来', '青', '永', '伊', '蝶', '贤', '芳', '阳', '傲', '琭', '靓', '隽', '施', '尔', '舒', '裴', '羡', '晗', '雰', '有', '辰', '夏', '文', '子', '叡', '洁', '锌', '竹', '珉', '奕', '卉', '川', '音', '宇', '瑾', '新', '风', '希', '忧', '瑜', '凤', '雅', '蕴', '玄', '格', '奥', '穆', '澈', '珠', '勤', '滢', '雨', '善', '景', '婧', '吉', '平', '沈', '知', '懿', '庭', '双', '喜', '雪', '莉', '落', '琨', '姣', '绮', '哲', '华', '金', '听', '仲', '怿', '诺', '语', '萝', '沛', '箫', '晖', '翠', '桜', '萱', '恬', '之', '隅', '梨', '暖', '天', '念', '嫣', '碧', '桃', '欣', '冷', '盼', '酪', '红', '素', '笛', '蓝', '葛', '杉', '流', '银', '肖', '悌', '珍', '柔', '姗', '婷', '谷', '媛', '含', '代', '元', '佩', '鸣', '颖', '芷', '农', '烟', '和', '婉', '宁', '然', '明', '楼', '饮', '木', '涵', '慧', '远', '真', '氷', '寒', '歆', '娜', '祺', '悠', '彦', '沐', '璇', '洛', '霈', '旦', '慕', '任', '美', '若', '紫', '敏', '苒', '曹', '禾', '维', '莲', '骄', '孤', '珂', '致', '偲', '飞', '睿', '初', '逸', '绿', '高', '书', '豫', '晴', '孟', '沙', '茹', '筠', '胤', '照', '彩', '心', '菱', '楚', '亦', '贝', '白', '列', '昱', '锦', '迎', '诗', '静', '菡', '冬', '松', '凌', '暄', '琦', '凡', '兰', '怡', '歌', '山', '弋', '星', '采', '曦', '依', '幻', '觅', '凉', '蕾', '世', '楠', '姝', '萦', '瓶', '兮', '霓', '灵', '郑', '湛', '丞', '卓', '枝', '燕', '姿', '步', '淑', '叶', '曼', '芬', '彭', '迪', '妙', '秉'];
export function name(sex = 0, len = 0) {
    if (sex == 0) {
        sex = Math.random() < 0.5 ? 1 : 2;
    }
    if (len == 0) {
        len = Math.random() < 0.3 ? 1 : 2;
    }
    let ans = choice(surname);
    for (let i = 0; i < len; ++i) {
        if (sex == 1) {
            ans += choice(name_male);
        } else {
            ans += choice(name_female);
        }
    }
    return ans;
}

export function choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function randint(a, b) { //[a,b]
    return Math.floor(Math.random() * (b - a + 1)) + a;
}