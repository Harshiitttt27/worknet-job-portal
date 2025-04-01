# jobs/serializers.py
from rest_framework import serializers
from .models import JobListing,Company
from users.serializers import CustomUserSerializer


from rest_framework import serializers
from .models import JobListing, Company
from users.serializers import CustomUserSerializer

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'  # You can also specify fields explicitly like ['id', 'name', 'description', ...]

class JobListingSerializer(serializers.ModelSerializer):
    employer = CustomUserSerializer(read_only=True)
    company_name = serializers.CharField(write_only=True)  
    # company_id = serializers.IntegerField(write_only=True)  # Changed to write_only for input
    company = CompanySerializer(read_only=True)  # Still read_only for output
    skills_required = serializers.ListField(
        child=serializers.CharField()  # This ensures the skills_required field is a list of strings
    )
    class Meta:
        model = JobListing
        fields = [
            'id', 'title', 'description', 'location', 'skills_required',
            'experience_required', 'posted_at', 'status', 'employer',
            'salary_range', 'job_type', 'application_deadline', 'remote_option',
            'benefits', 'contact_email', 'company', 'company_name'
        ]

    def create(self, validated_data):
        # Extract company_name from validated data and find or create the company
        company_name = validated_data.pop('company_name')
        
        # Find or create the company based on the name
        company, created = Company.objects.get_or_create(name=company_name)

        # Create the job listing with the company
        job_listing = JobListing.objects.create(company=company, **validated_data)
        return job_listing
        
# serializers.py
from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'job_listing', 'user', 'status', 'applied_at']