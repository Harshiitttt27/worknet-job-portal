# users/urls.py

from django.urls import path
from .views import ContactFormView, RegisterUserView, LoginView, UserViewSet,UserListView,UserDeleteView,CheckUserRoleView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),  # User registration
    path('login/', LoginView.as_view(), name='login'),  # User login
    path('profile/', UserViewSet.as_view(), name='profile'),  # User profile (authenticated)
    path('userlist/', UserListView.as_view(), name='user-list'),  # List all registered users
    path('delete/<int:user_id>/', UserDeleteView.as_view(), name='user-delete'),
    path('users/check-role/', CheckUserRoleView.as_view(), name='check-user-role'),
  
    path('contact/', ContactFormView.as_view(), name='contact_form'),
]

   

