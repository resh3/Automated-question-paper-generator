from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.home,name='home'),
    path('signup',views.signup,name='signup'),
    path('signinfac',views.signinfac,name='signinfac'),
    path('signout',views.signout,name='signout'),
    path('updatecontent',views.update_content,name='updatecontent'),
    path('dashboard/',views.dashboard,name='dashboard'),
    path('question',views.data_view,name='question'),
    path('add_questions', views.add_questions,name ='add_questions'),
    path('profile',views.profile,name='profile'),
    path('coe',views.coe,name='coe'),
    path('assign',views.assign,name='assign'),
    path('cate',views.cate,name='assign'),
    path('quesgen',views.quesgen,name="quesgen"),
    path('finalsubmission',views.edit_question_view,name='finalsubmission'),
    path('qbank', views.qbank,name ='qbank'),
    path('notification',views.notif,name="notification"),
    path('adsignin',views.adsignin,name='adsignin'),
    path('export',views.export,name='export')
]
