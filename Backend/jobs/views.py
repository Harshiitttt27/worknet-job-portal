# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from .serializers import JobListingSerializer

# class JobListingCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         serializer = JobListingSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import JobListing,Company
from .serializers import JobListingSerializer,CompanySerializer
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Application, JobListing
from .serializers import ApplicationSerializer


class CompanyListCreateView(APIView):
    permission_classes = [IsAuthenticated]


    def post(self, request, *args, **kwargs):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Company created successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"detail": "Validation failed", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response({"message": "Companies retrieved successfully", "data": serializer.data}, status=status.HTTP_200_OK)

    

class CompanyDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Company.objects.get(pk=pk)
        except Company.DoesNotExist:
            return None

    def get(self, request, pk, *args, **kwargs):
        company = self.get_object(pk)
        if company is None:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CompanySerializer(company)
        return Response({"message": "Company details retrieved successfully", "data": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, *args, **kwargs):
        company = self.get_object(pk)
        if company is None:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Company details updated successfully", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        company = self.get_object(pk)
        if company is None:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        company.delete()
        return Response({"message": "Company deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

class JobListingCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = JobListingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Job listing created successfully",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "detail": "Validation failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class JobListingDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return JobListing.objects.select_related('company').get(pk=pk)
        except JobListing.DoesNotExist:
            return None

    def get(self, request, pk=None, *args, **kwargs):
        if pk is not None:
            job_listing = self.get_object(pk)
            if job_listing is None:
                return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = JobListingSerializer(job_listing)
            print(serializer.data)  # Debug print to see the serialized data
            return Response({
                "message": "Job listing retrieved successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            job_listings = JobListing.objects.select_related('company').all()
            serializer = JobListingSerializer(job_listings, many=True)
            print(serializer.data)  # Debug print to see the serialized data
            return Response({
                "message": "Fetched all job listings",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
    def put(self, request, pk=None, *args, **kwargs):
        job_listing = self.get_object(pk)
        if job_listing is None:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        # You can update the job listing with the data provided in the request
        serializer = JobListingSerializer(job_listing, data=request.data, partial=False)  # Set partial=True if you want to allow partial updates
        if serializer.is_valid():
            serializer.save()  # Save the updated data
            return Response({
                "message": "Job listing updated successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response({
            "detail": "Validation failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None, *args, **kwargs):
        job_listing = self.get_object(pk)
        if job_listing is None:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        job_listing.delete()  # Delete the job listing
        return Response({
            "message": "Job listing deleted successfully"
        }, status=status.HTTP_204_NO_CONTENT)

class ApplicationCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, job_listing_id, *args, **kwargs):
        job_listing = JobListing.objects.get(pk=job_listing_id)
        application = Application.objects.create(job_listing=job_listing, user=request.user)
        serializer = ApplicationSerializer(application)
        return Response({"message":"Job applied successfully","data":serializer.data}, status=status.HTTP_201_CREATED)

class ApplicationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        applications = Application.objects.filter(user=request.user)
        serializer = ApplicationSerializer(applications, many=True)
        return Response({"message":"Job applications retrieved successfully","data":serializer.data}, status=status.HTTP_200_OK)

class ApplicationWithdrawView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, application_id, *args, **kwargs):
        try:
            application = Application.objects.get(pk=application_id, user=request.user)
            application.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Application.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

class ApplicationStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, application_id, *args, **kwargs):
        try:
            application = Application.objects.get(pk=application_id, user=request.user)
            serializer = ApplicationSerializer(application)
            return Response(serializer.data)
        except Application.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)




class JobSearchView(APIView):
    """
    View to search job listings by title.
    Query parameter `query` can be used to search by job title.
    """

    def get(self, request, *args, **kwargs):
        search_query = request.GET.get('query', '').strip()

        if not search_query:
            job_listings = JobListing.objects.all()  # Fetch all job listings if no search query is provided
        else:
            job_listings = JobListing.objects.filter(title__icontains=search_query)  # Case-insensitive search by title

        serializer = JobListingSerializer(job_listings, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
