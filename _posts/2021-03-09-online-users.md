---
layout: post
title: 同时在线用户数怎么计算
categories: [架构设计]
description: 同时在线用户数怎么计算
keywords: 同时在线用户数, 架构设计
excerpt: 怎么算同时在线用户数，怎样在工作中预估服务器的架构是否合理，这时就需要考虑下用户的同时在线数和请求数，在实际的性能测试工作中，测试人员一般比较关心的是业务并发用户数，也就是从业务角度关注究竟应该设置多少个并发数比较合理，因此，在后面的讨论中，也是主要针对业务并发用户数进行讨论，而且，为了方便，直接将业务并发用户数称为并发用户数。 
---

怎么算同时在线用户数，怎样在工作中预估服务器的架构是否合理，这时就需要考虑下用户的同时在线数和请求数，在实际的性能测试工作中，测试人员一般比较关心的是业务并发用户数，也就是从业务角度关注究竟应该设置多少个并发数比较合理，因此，在后面的讨论中，也是主要针对业务并发用户数进行讨论，而且，为了方便，直接将业务并发用户数称为并发用户数。 

（1） 计算平均的并发用户数： C = nL/T    
（2） 并发用户数峰值： C’ ≈ C+3*√C          

公式（1）中，C是平均的并发用户数；n是login session的数量；L是login session的平均长度；T指考察的时间段长度。     
公式（2）则给出了并发用户数峰值的计算方式中，其中，C’指并发用户数的峰值，C就是公式（1）中得到的平均的并发用户数。该公式的得出是假设用户的login session产生符合泊松分布而估算得到的。          

=================================================         
实例：  
    假设有一个OA系统，该系统有3000个用户，平均每天大约有400个用户要访问该系统，对一个典型用户来说，一天之内用户从登录到退出该系统的平均时间为4小时，在一天的时间内，用户只在8小时内使用该系统。      
则根据公式（1）和公式（2），可以得到：
     C = 400*4/8 = 200
     C’≈200+3*根号200 = 242 
     F=VU * R / T
其中F为吞吐量，VU表示虚拟用户个数，R表示每个虚拟用户发出的请求数，T表示性能测试所用的时间      
R = T / TS        
TS为用户思考时间        
计算思考时间的一般步骤：        
A、 首先计算出系统的并发用户数         
C=nL / T      F=R×C           
B、 统计出系统平均的吞吐量         
F=VU * R / T R×C = VU * R / T       
C、 统计出平均每个用户发出的请求数量          
R=u*C*T/VU       
D、根据公式计算出思考时间       
TS=T/R        
缺陷检测有效性百分比DDE=TDFT/(TDFC+TDFT)×100%        
其中:TDFT=测试过程中发现的全部缺陷(即由测试组发现的),TDFC=客户发现的全部缺陷(在版本交付后一个标准点开始测量,如,半年以后)        

 

缺陷排除有效性百分比DRE=(TDCT/TDFT)×100%
其中:TDCT=测试中改正的全部缺陷,TDFT=测试过程中发现的全部缺陷

测试用例设计效率百分比TDE=(TDFT/NTC)×100%
其中:TDFT=测试过程中发现的全部缺陷,NTC=运行的测试用例数

以下公式较适用于白盒测试
功能覆盖率= 至少被执行一次的测试功能点数/ 测试功能点总数 （功能点）
需求覆盖率= 被验证到的需求数量 /总的需求数量 （需求）
覆盖率= 至少被执行一次的测试用例数/ 应执行的测试用例总数 （测试用例）
语句覆盖率= 至少被执行一次的语句数量/ 有效的程序代码行数
判定覆盖率= 判定结果被评价的次数 / 判定结果总数
条件覆盖率= 条件操作数值至少被评价一次的数量 / 条件操作数值的总数
判定条件覆盖率= 条件操作数值或判定结果至少被评价一次的数量/(条件操作数值总数+判定结果总数)
上下文判定覆盖率= 上下文内已执行的判定分支数和/(上下文数*上下文内的判定分支总数)
基于状态的上下文入口覆盖率= 累加每个状态内执行到的方法数/(状态数*类内方法总数)
分支条件组合覆盖率= 被评测到的分支条件组合数/分支条件组合数
路径覆盖率= 至少被执行一次的路径数/程序总路径数

> 本文引自https://www.cnblogs.com/legendmaner/articles/2971231.html