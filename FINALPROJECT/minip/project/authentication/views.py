
from django.shortcuts import redirect, render
from django.http import FileResponse,HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
import pyrebase
import firebase_admin
from firebase_admin import credentials,firestore,auth
from google.cloud.firestore_v1 import field_path
import random
import pandas as pd
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import uuid
from io import BytesIO
import time

cred = credentials.Certificate('D:/New folder/mini-project-d6397-firebase-adminsdk-ambn6-e3801c040d.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

config= {
    'apiKey': "AIzaSyAB69oSg-KCnbUk_7VJ47DYs8StOEe-sgk",
  'authDomain': "mini-project-d6397.firebaseapp.com",
  'projectId': "mini-project-d6397",
  'databaseURL': "https://mini-project-d6397.firebaseio.com",
  'storageBucket': "mini-project-d6397.appspot.com",
  'messagingSenderId': "884557626904",
  'appId': "1:884557626904:web:20bef6101d09774a558d6d",
  'measurementId': "G-QCV2G30W9V"
}

# firebase=pyrebase.initialize_app(config)
# auth = firebase.auth()
# database=firebase.database()

# Create your views here.
def home(request):
    return render(request,'authentication/index.html')
def signup(request):
    if request.method=="POST":
        username=request.POST['username']
        email=request.POST['Email']
        password=request.POST['Password']
        confirm=request.POST['Confirm']

        myuser=User.objects.create_user(username,email,password)
        myuser.save()
        messages.success(request,"Your account has been created")
        return redirect('signinfac')
    return render(request,"authentication/signup.html")


def signinfac(request):
    firebase=pyrebase.initialize_app(config)
    auth = firebase.auth()
    database=firebase.database()
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user=auth.sign_in_with_email_and_password(email,password)
            return redirect('updatecontent')
        except:
            message="Invalid Credentials!!Please ChecK your Data"
            return render(request,"authentication/signin.html",{"message":message})

    return render(request, "authentication/signin.html")


def signout(request):
    # logout(request)
    # messages.success(request, "Logged Out Successfully!!")
    # user = auth.get_user_by_email(email)  # Replace 'email' with the user's email
    # auth.revoke_refresh_tokens(user.uid)

    # Redirect the user to a desired page after logout
    return redirect('home')
def update_content(request):
    if request.method == 'POST':
        selected_checkboxes = request.POST.getlist('checkbox', [])
        dropdown1 = request.POST.get('dropdown1', '')
        dropdown2 = request.POST.get('dropdown2', '')
        
        if len(selected_checkboxes) == 1 and dropdown1 and dropdown2:
            selected_checkbox = selected_checkboxes[0]

            return redirect(f'dashboard/?checkbox={selected_checkbox}&dropdown1={dropdown1}&dropdown2={dropdown2}')
    return render(request, 'authentication/deptt.html')
def dashboard(request):
    checkbox = request.GET.get('checkbox', '')
    dropdown1 = request.GET.get('dropdown1', '')
    dropdown2 = request.GET.get('dropdown2', '')


    context = {
        'checkbox': checkbox,
        'dropdown1': dropdown1,
        'dropdown2': dropdown2,
    }

    return render(request,'authentication/dashboard.html')
    
def export(request):
     if request.method == 'POST' and 'export' in request.POST:
        question_data = []
        query = db.collection('questions')
        questions = query.get()
        filtered_questions = []

        for question in questions:
                q = question.to_dict()
                filtered_questions.append(q)

        df = pd.DataFrame(filtered_questions)

        excel_file = df.to_excel('questions.xlsx', index=False)

        with open('questions.xlsx', 'rb') as excel_file:
            response = HttpResponse(excel_file.read(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = 'attachment; filename=questions.xlsx'
            
        return response    

        
    
def data_view(request):
    if request.method == 'POST' and 'generate_question' in request.POST:

        total_rows=int(request.POST.get('total_rows'))
        print(total_rows)
        
        question_data = []
        selected_questions = set()
        
        for row_num in range(1, total_rows + 1):
            module = int(request.POST.get('module_' + str(row_num)))
            print(module)
            taxonomy = request.POST.get('taxonomy_' + str(row_num))
            print(taxonomy)
            difficulty_level = request.POST.get('difficulty_level_' + str(row_num))
            print(difficulty_level)
            course_outcome = request.POST.get('course_outcome_' + str(row_num))
            print(course_outcome)
            marks=int(request.POST.get('marks_' + str(row_num)))
            query = db.collection('questions')
            questions = query.get()
            filtered_questions = []

            for question in questions:
                q = question.to_dict()
                print('1000000000000000',q)
                
                if q['Mod'] == module and q['taxonomy'] == taxonomy and q['Diff'] == difficulty_level and q['CO'] == course_outcome and q['marks']==marks:
                    filtered_questions.append(question)
                    print('20000000000',filtered_questions)
            if filtered_questions:
                available_questions = [q for q in filtered_questions if q.id not in selected_questions]
                print('30000000000000',available_questions)
                if available_questions:
                    selected_question = random.choice(available_questions)
                    print('400000000000',selected_question)
                    question_data.append(selected_question.to_dict())
                    print('500000000000000',question_data)
                    selected_questions.add(selected_question.id)
        print('6',question_data)

        # df = pd.DataFrame(question_data)

        # excel_file = df.to_excel('questions.xlsx', index=False)

        # with open('questions.xlsx', 'rb') as excel_file:
        #     response = HttpResponse(excel_file.read(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        #     response['Content-Disposition'] = 'attachment; filename=questions.xlsx'
            
        #     return response
        context = {
            'questions': question_data,
            'rows':total_rows
        }

        return render(request, 'authentication/your_template.html', context)
    

def add_questions(request):
    if request.method == 'POST':
     total_rows = int(request.POST.get('total_rows')) 
     for row_num in range(1, total_rows + 1):   
        print('1111111111111111111111111111111111111111111111111111111111')
        data = {
            
            'CO':request.POST.get('CO_' + str(row_num)),
            'Diff': request.POST.get('Diff_' + str(row_num)),
            'Mod':int( request.POST.get('Mod_' + str(row_num))),
            'question': request.POST.get('question_' + str(row_num)),
            'marks': int(request.POST.get('marks_' + str(row_num))),
            'taxonomy': request.POST.get('taxonomy_' + str(row_num)),

        }
        print(data)
     
        db = firestore.client()
        db.collection('questions').add(data)


    return render (request,"authentication/newqn.html")

def profile(request):
    return render(request,'authentication/pro.html')

def coe(request):
    return render(request,'authentication/admin.html')

def assign(request):
    return render(request,'authentication/assign.html')

def cate(request):
    return render(request,'authentication/cate.html')




def quesgen(request):
    db = firestore.client()
    main_collection_ref = db.collection('coe')
    collections = main_collection_ref.list_documents()

    # Create a BytesIO buffer to store the PDF data
    pdf_buffer = BytesIO()
    p = canvas.Canvas(pdf_buffer, pagesize=A4)

   

    for collection_ref in collections:
         # Customize your question paper template here
        Exam_name = "SIXTH SEMESTER B.TECH DEGREE(REGULAR) EXAMINATION,AUGUST 2023"
        sub = "ALGORITHM ANALYSIS AND DESIGN"
        section_name = "Part A"

        p.setFont('Times-Bold', 15)
        p.drawCentredString(300, 750, Exam_name)

        p.setFont('Times-Bold', 15)
        p.drawCentredString(300, 735, sub)

        p.setFont('Times-Bold', 12)
        p.drawCentredString(300, 710, f" {section_name}")

        p.setFont('Times-Roman', 12)

        y_position = 680
        count = 0
        collection_name = collection_ref.id
        questions_ref = collection_ref.collection('sub_collection').order_by('timestamp')
        questions = [doc.to_dict()['question'] for doc in questions_ref.stream()]
        marks = [doc.to_dict()['marks'] for doc in questions_ref.stream()]
        print(questions)

        # Insert questions into the PDF
        for index, question in enumerate(questions):
            if count < 3:
                y_position -= 20
                p.drawString(50, y_position, f'{index + 1}. {question}')
                count += 1
                i=index+1
                n=i+1
        y_position -= 20
        p.setFont('Times-Bold', 12)
        p.drawCentredString(300, y_position, "Part B")

        p.setFont('Times-Roman', 12)
        mark=14
        # i=5
        ch='a'
        count=2
        mod=2
        orr=0
        j=1
        k=1
        for question in questions[3:]:  
                    if y_position - 20 < 100:
                        p.showPage()
                        y_position = 750
                        p.setFont('Times-Roman', 12)
                    if mod==2:
                        y_position -= 30
                        p.setFont('Times-Bold', 12)
                        p.drawCentredString(300, y_position, ("Module "+str(j)))
                        mod=0
                        orr=1
                        j+=1
                        p.setFont('Times-Roman', 12)
                    if marks[i]==14:
                        y_position -= 20
                        p.drawString(50, y_position, f'{n}. {question}    ({marks[i]})')
                        i+=1
                        n+=1
                        mod+=1
                        if orr:
                                    y_position -= 30
                                    p.drawString(300, y_position, 'OR')
                                    mod=1
                                    orr=0
                    else:
                        # if marks[i-k]==14:
                        if mod==1 and marks[i-k]==14:
                                y_position -= 20
                                p.drawString(50, y_position, f'{n}.{ch}) {question}    ({marks[i]}) ')
                                print(mark,marks[i])
                                mark=mark-marks[i]
                                i+=1
                                k+=1
                                # mod+=1
                                if mark==0:
                                    print(1)
                                    ch='a'
                                    # count=0
                                    n+=1
                                    mod+=1
                                    k=1
                                    mark=14
                                    # mod=2
                                else:
                                    print(2)
                                    ch=ord(ch)+1   
                                    ch=chr(ch) 
                                    # mod-=1
                                if orr:
                                    y_position -= 30
                                    p.drawString(300, y_position, 'OR')
                                    mod=1
                                    orr=0
                                    y_position -=10
                                    mark=14
                        else:
                            y_position -= 20
                            p.drawString(50, y_position, f'{n}.{ch}) {question}    ({marks[i]})')
                            print(mark,marks[i])
                            mark=mark-marks[i]
                            i+=1
                            mod+=1
                            if mark==0:
                                print(1)
                                ch='a'
                                count=0
                                n+=1
                                # mod=2
                            else:
                                print(2)
                                ch=ord(ch)+1   
                                ch=chr(ch) 
                                mod-=1
                            if count==0:
                                print(3)
                                print('sgvc sghv hngesvevghjevcgaevgevcgevhgevdhgevdhg')
                                # mod-=1
                                if orr:
                                    y_position -= 30
                                    p.drawString(300, y_position, 'OR')
                                    mod=1
                                    orr=0
                                y_position -=10
                                mark=14
                                count=1

        # Add a new page for the next collection's questions
        p.showPage()

    # Save the PDF content and serve it for download
    p.save()
    pdf_buffer.seek(0)
    response = FileResponse(pdf_buffer, content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="question_papers.pdf"'
    return response



# def edit_question_view(request):
#    if request.method == 'POST' and 'save_changes' in request.POST:
#     total_rows=int(request.POST.get('total_rows'))
#     print(total_rows)
#     for row_num in range(1, total_rows + 1):
#             module = int(request.POST.get('module_' + str(row_num)))
#             print(module)
#             taxonomy = request.POST.get('taxonomy_' + str(row_num))
#             print(taxonomy)
#             difficulty_level = request.POST.get('difficulty_level_' + str(row_num))
#             print(difficulty_level)
#             course_outcome = request.POST.get('course_outcome_' + str(row_num))
#             print(course_outcome)
#             question=request.POST.get('question_' + str(row_num))
#             marks = request.POST.get('marks_' + str(row_num))
#             selected_question = {
#             'Mod': module,
#             'taxonomy': taxonomy,
#             'Diff': difficulty_level,
#             'CO': course_outcome,
#             'question': question,
#             'marks':marks
#             }
#             db = firestore.client()
#             db.collection('coe').add(selected_question)

#     return render(request, 'authentication/your_template.html')



def edit_question_view(request):
    if request.method == 'POST' and 'save_changes' in request.POST:
        total_rows = int(request.POST.get('total_rows'))
        user_provided_document_id = request.POST.get('document_id')  # Assuming you have an input field with name="document_id"

        # Generate a random string to ensure uniqueness
        random_string = str(uuid.uuid4().hex)[:8]  # You can adjust the length as needed

        # Combine user-provided document ID with the random string to create a unique ID
        unique_document_id = f"{user_provided_document_id}_{random_string}"

        # Create a reference to the main collection
        main_collection_ref = db.collection('coe')

        for row_num in range(1, total_rows + 1):
            module = int(request.POST.get('module_' + str(row_num)))
            taxonomy = request.POST.get('taxonomy_' + str(row_num))
            difficulty_level = request.POST.get('difficulty_level_' + str(row_num))
            course_outcome = request.POST.get('course_outcome_' + str(row_num))
            question = request.POST.get('question_' + str(row_num))
            marks = int(request.POST.get('marks_' + str(row_num)))

            # Create a dictionary for the data to be added
            selected_question = {
                'Mod': module,
                'taxonomy': taxonomy,
                'Diff': difficulty_level,
                'CO': course_outcome,
                'question': question,
                'marks': marks,
                'timestamp': int(time.time() * 1000)
            }

            # Create a reference to the specific document using the unique ID
            main_document_ref = main_collection_ref.document(unique_document_id)

            # Create a reference to the sub-collection inside the document
            sub_collection_ref = main_document_ref.collection('sub_collection')

            # Add the data to the sub-collection
            sub_collection_ref.add(selected_question)

        return render(request, 'authentication/your_template.html')



    #question bank  from data base 

def qbank(request):
        ques=[]
        db = firestore.client()
        questions_ref = db.collection('questions')
        query_snapshot = questions_ref.get()
        for question in query_snapshot:
            q=question.to_dict()
            ques.append(q)
        
        context={
            'question':ques
        }
        return render(request, 'authentication/qbank.html', context)

def notif(request):
    return render(request,'authentication/not.html')

def adsignin(request):
    firebase=pyrebase.initialize_app(config)
    auth = firebase.auth()
    database=firebase.database()
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user=auth.sign_in_with_email_and_password(email,password)
            return redirect('coe')
        except:
            message="Invalid Credentials!!Please ChecK your Data"
            return render(request,"authentication/signin.html",{"message":message})

    return render(request, "authentication/adsignin.html")