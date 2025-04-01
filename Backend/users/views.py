from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Contact

from .serializers import UserRegistrationSerializer, CustomUserSerializer,ContactSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User  # Import the User model
from users.models import CustomUser  # Import CustomUser
from django.core.exceptions import ObjectDoesNotExist
class RegisterUserView(APIView):
    """
    User Registration View: Now returns authentication token and user data
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate tokens for the new user
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            
            # Get user data to return
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                # Add other user fields you need
            }
            
            return Response({
                "message": "User registered successfully.",
                "access_token": access_token,
                "user": user_data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# views.py

class LoginView(APIView):
    """
    User Login View: Login and get JWT tokens (Bearer Token)
    """
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                # Add other user fields you need
            }

            return Response({
                'access_token': access_token,
                'user': user_data,
                'message': 'User logged in successfully'
            })
        
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
class UserViewSet(APIView):
    """
    Protected User ViewSet for retrieving and updating user info
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user  # This will be the authenticated user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user  # This will be the authenticated user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request):
        """
        Partial update to update specific fields of the user profile.
        """
        user = request.user  # This will be the authenticated user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)  # `partial=True` allows partial updates

        if serializer.is_valid():
            serializer.save()  # Save the updated user
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListView(APIView):
    """
    View to list all registered users
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = CustomUser.objects.all()  # Retrieve all users
        serializer = CustomUserSerializer(users, many=True)  # Serialize all users
        return Response(serializer.data)
    

class UserDeleteView(APIView):
    """
    Delete a specific user by id (Admin or user who is authenticated)
    """
    permission_classes = [IsAuthenticated]  # Only authenticated users can delete

    def delete(self, request, user_id):
        """
        DELETE request to delete a specific user by their id
        """
        try:
            user_to_delete = CustomUser.objects.get(id=user_id)  # Fetch user by id
        except ObjectDoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the authenticated user is trying to delete their own profile
        if request.user == user_to_delete:
            user_to_delete.delete()
            return Response({'message': 'Your profile has been deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

        # Allow staff members to delete any user
        if request.user.is_staff:  # Check if the user is staff
            user_to_delete.delete()
            return Response({'message': 'User profile deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

        return Response({'error': 'You do not have permission to delete this profile.'}, status=status.HTTP_403_FORBIDDEN)


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class CheckUserRoleView(APIView):
    """
    Check User Role: Returns the role of the authenticated user
    """
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def get(self, request):
        # Get the authenticated user
        user = request.user

        # Check the user's role
        user_role = user.role  # Custom field defined in CustomUser model

        return Response({
            'role': user_role,
            'message': 'User role fetched successfully'
        }, status=status.HTTP_200_OK)


class ContactFormView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request):
        # Deserialize the data
        serializer = ContactSerializer(data=request.data)
        
        # Validate and save the contact message
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Thank you for contacting us!"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
